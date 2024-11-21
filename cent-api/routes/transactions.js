const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const debug = require("debug")("api:transactions");
const express = require("express");
const router = express.Router();

router.get("/:transactionId", getTransaction);
router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/", updateTransaction);
router.delete("/", deleteTransaction);

function getTransaction(req, res) {
  const transactionId = req.params.transactionId;

  console.log("transactionId", transactionId);

  res.send({
    type: "EXP",
    date: new Date("2024-05-11"),
    name: "Hydrogen",
    amount: 1.0,
    currency: "H",
    rate: 1,
  });
}

function getTransactions(req, res) {
  debug("path", path.join(__dirname, "..", "db.json"));

  fs.readFile(
    path.join(__dirname, "..", "db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        debug("err", err);
        res.status(400).send(err);
        return;
      }

      const db = JSON.parse(data);

      debug("uuid", uuid());
      debug("db", db);

      res.send([
        ...db.transactions.map((t) => ({
          ...t,
          source: db.sources.find((s) => s.id === t.sourceId),
          category: db.categories.find((c) => c.id === t.categoryId),
        })),
      ]);
    }
  );
}

function addTransaction(req, res) {
  const transaction = req.body;

  debug("transaction", transaction);

  fs.readFile(
    path.join(__dirname, "..", "db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        res.status(400).send(err);
        return;
      }

      const db = JSON.parse(data);

      db.transactions.push({
        ...transaction,
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
          res.send([...db.transactions]);
        }
      );
    }
  );
}

function updateTransaction(req, res) {
  res.send({
    type: "EXP",
    date: new Date("2024-05-11"),
    name: "Hydrogen",
    amount: 1.0,
    currency: "H",
    rate: 1,
  });
}

function deleteTransaction(req, res) {
  res.send(true);
}

module.exports = router;
