"use strict";
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("./user");
const multer = require("multer");

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
    user.supID = mongoose.Types.ObjectId(req.body.supID);
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
});

router.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
