"use strict";
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
    supID: req.body.supID,
  });
  userToPost.save().then((user) => res.json(user));
});

router.get("/users", (req, res) => {
  let regSearch = new RegExp("^" + req.query.search);
  console.log("query", req.query);
  User.find(
    {
      $or: [{ name: regSearch }, { rank: regSearch }, { sex: regSearch }],
    },
    null,
    {
      sort: { [req.query.sortMethod]: req.query.sortDir },
      limit: req.query.page * 5,
    },
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
  /*
  User.find(
    {
      $or: [
        { name: regSearch },
        { sex: regSearch },
        { rank: regSearch },
      ],
    },
    null,null,
    (err, users) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
      res.status(200).json(users);
    }
  );
  */
});

router.put("/users/:id", (req, res) => {
  User.updateOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    age: req.body.age,
    password: req.body.password,
  })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
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
