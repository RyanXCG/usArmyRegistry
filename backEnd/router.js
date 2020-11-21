"use strict";
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("./user");
const multer = require("multer");

router.post("/usersByIDs", (req, res) => {
  console.log("req.body", req.body);
  const ObjIDs = req.body.IDs.map((id) => mongoose.Types.ObjectId(id));
  console.log("IDs", ObjIDs);
  User.aggregate(
    [
      {
        $match: {
          $expr: {
            $in: ["$_id", ObjIDs],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { sup_id: "$supID" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$sup_id"] } } },
            { $project: { name: 1 } },
          ],
          as: "supName",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { target_id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$supID", "$$target_id"] } } },
            { $project: { _id: 1 } },
          ],
          as: "subs",
        },
      },
    ],
    (err, users) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
      //console.log(users);
      res.status(200).json(users);
    }
  );
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
  //console.log("file object", req.file);
  console.log(req.body);
  if (req.body.supID) {
    const userToPost = new User({
      avator: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
      name: req.body.name,
      rank: req.body.rank,
      sex: req.body.sex,
      startDate: req.body.startDate,
      phone: req.body.phone,
      email: req.body.email,
      supID: mongoose.Types.ObjectId(req.body.supID),
    });
    userToPost.save().then((user) => res.json(user));
  } else {
    const userToPost = new User({
      avator: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
      name: req.body.name,
      rank: req.body.rank,
      sex: req.body.sex,
      startDate: req.body.startDate,
      phone: req.body.phone,
      email: req.body.email,
    });
    userToPost.save().then((user) => res.json(user));
  }
});

router.put("/users/:id", upload.single("image"), (req, res) => {
  //console.log("file object", req.file);
  console.log("req.body", req.body);
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    }
    user.avator = {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    };
    user.name = req.body.name;
    user.rank = req.body.rank;
    user.sex = req.body.sex;
    user.startDate = req.body.startDate;
    user.phone = req.body.phone;
    user.email = req.body.email;
    if (req.body.supID) {
      user.supID = mongoose.Types.ObjectId(req.body.supID);
    }
    console.log("user.supID", user.supID);
    user.save().then(() => res.json({ sucess: true }));
  });
});

router.get("/users", (req, res) => {
  let regSearch = new RegExp("^" + req.query.search);
  console.log("query", req.query);
  User.aggregate(
    [
      {
        $match: {
          $or: [{ name: regSearch }, { rank: regSearch }, { sex: regSearch }],
        },
      },
      { $sort: { [req.query.sortMethod]: parseInt(req.query.sortDir) } },
      { $limit: req.query.page * 5 },
      {
        $lookup: {
          from: "users",
          let: { sup_id: "$supID" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$sup_id"] } } },
            { $project: { name: 1 } },
          ],
          as: "supName",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { target_id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$supID", "$$target_id"] } } },
            { $project: { _id: 1 } },
          ],
          as: "subs",
        },
      },
    ],
    (err, users) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
      //console.log(users);
      res.status(200).json(users);
    }
  );
});

router.get("/users/:id", (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  User.aggregate(
    [
      { $match: { _id: id } },
      {
        $graphLookup: {
          from: "users",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "supID",
          as: "allChildren",
        },
      },
      {
        $project: {
          avator: 1,
          name: 1,
          rank: 1,
          sex: 1,
          startDate: 1,
          phone: 1,
          email: 1,
          supID: 1,
          "allChildren._id": 1,
        },
      },
    ],
    (err, users) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
      //console.log(users);
      res.status(200).json(users[0]);
    }
  );
});

router.get("/count", (req, res) => {
  console.log(req.query.search);
  let regSearch = new RegExp("^" + req.query.search);
  User.aggregate(
    [
      {
        $match: {
          $or: [{ name: regSearch }, { sex: regSearch }, { rank: regSearch }],
        },
      },
      {
        $count: "count",
      },
    ],
    (err, count) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
      res.status(200).json(count);
    }
  );
});

router.delete("/:id", (req, res) => {
  //find all this id's direct children and then update their superior
  console.log(
    "delete requested",
    "supID: ",
    req.query.supID,
    "id: ",
    req.params.id
  );
  User.updateMany(
    { supID: mongoose.Types.ObjectId(req.params.id) },
    req.query.supID
      ? { $set: { supID: mongoose.Types.ObjectId(req.query.supID) } }
      : { $unset: { supID: "" } }
  )
    .then(() => {
      console.log("start delete user");
      User.findById(req.params.id).then((user) => {
        user
          .remove()
          .then(() =>
            res.json({
              success: true,
            })
          )
          .catch((err) => res.status(404).json({ success: false }));
      });
    })
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
