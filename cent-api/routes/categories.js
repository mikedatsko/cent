const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const debug = require("debug")("api:categories");
const express = require("express");
const router = express.Router();

router.get("/:categoryId", getCategory);
router.get("/", getCategories);
router.post("/", addCategory);
router.put("/", updateCategory);
router.delete("/", deleteCategory);

function getCategory(req, res) {
  const categoryId = req.params.categoryId;

  debug("categoryId", categoryId);

  fs.readFile(
    path.join(__dirname, "..", "db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        res.status(400).send(err);
        return;
      }

      const db = JSON.parse(data);
      const category = db.categories.find((s) => s.id === categoryId);

      debug("category", category);

      res.send({ ...category });
    }
  );
}

function getCategories(req, res) {
  debug("path", path.join(__dirname, "..", "db.json"));

  fs.readFile(
    path.join(__dirname, "..", "db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        res.status(400).send(err);
        return;
      }

      const db = JSON.parse(data);

      debug("uuid", uuid());
      debug("db", db);

      res.send([...db.categories]);
    }
  );
}

async function addCategory(req, res) {
  try {
    const category = req.body;
    const categoriesRef = db.collection("categories");

    await categoriesRef.add(category);
    const snapshot = await categoriesRef.get();

    res.send([...snapshot]);
  } catch (err) {
    res.status(400).send({ err });
  }

  // fs.readFile(
  //   path.join(__dirname, "..", "db.json"),
  //   "utf8",
  //   function (err, data) {
  //     if (err) {
  //       res.status(400).send(err);
  //       return;
  //     }

  //     const db = JSON.parse(data);

  //     db.categories.push({
  //       ...category,
  //       id: uuid(),
  //     });

  //     debug("uuid", uuid());
  //     debug("db", db);

  //     fs.writeFile(
  //       path.join(__dirname, "..", "db.json"),
  //       JSON.stringify(db),
  //       function (err) {
  //         if (err) {
  //           return console.log(err);
  //         }

  //         console.log("The file was saved!");
  //         res.send([...db.categories]);
  //       }
  //     );
  //   }
  // );
}

function updateCategory(req, res) {
  res.send({
    type: "EXP",
    date: new Date("2024-05-11"),
    name: "Hydrogen",
    amount: 1.0,
    currency: "H",
    rate: 1,
  });
}

function deleteCategory(req, res) {
  res.send(true);
}

module.exports = router;
