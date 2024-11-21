const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const debug = require("debug")("api:sources");
const express = require("express");
const router = express.Router();

router.get("/:sourceId", getSource);
router.get("/", getSources);
router.post("/", addSource);
router.put("/", updateSource);
router.delete("/", deleteSource);

function getSource(req, res) {
  const sourceId = req.params.sourceId;

  debug("sourceId", sourceId);

  fs.readFile(
    path.join(__dirname, "..", "db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        res.status(400).send(err);
        return;
      }

      const db = JSON.parse(data);
      const source = db.sources.find((s) => s.id === sourceId);

      debug("source", source);

      res.send({ ...source });
    }
  );
}

function getSources(req, res) {
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

      res.send([...db.sources]);
    }
  );
}

function addSource(req, res) {
  const source = req.body;

  fs.readFile(
    path.join(__dirname, "..", "db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        res.status(400).send(err);
        return;
      }

      const db = JSON.parse(data);

      db.sources.push({
        ...source,
        id: uuid(),
      });

      debug("uuid", uuid());
      debug("db", db);

      fs.writeFile(
        path.join(__dirname, "..", "db.json"),
        JSON.stringify(db),
        function (err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.send([...db.sources]);
        }
      );
    }
  );
}

function updateSource(req, res) {
  res.send({
    type: "EXP",
    date: new Date("2024-05-11"),
    name: "Hydrogen",
    amount: 1.0,
    currency: "H",
    rate: 1,
  });
}

function deleteSource(req, res) {
  res.send(true);
}

module.exports = router;
