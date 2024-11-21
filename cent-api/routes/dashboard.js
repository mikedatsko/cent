const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const debug = require("debug")("api:transactions");
const express = require("express");
const router = express.Router();

router.get("/chart", getDashboardChart);
router.get("/chart/month", getDashboardChartMonth);
router.get("/table", getDashboardTable);
router.get("/table/sources/:currency", getDashboardTableSources);

function getDashboardChart(req, res) {
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
      const datasets = [];

      for (let i = 0; i < db.categories.length; i++) {
        const category = db.categories[i];
        let INC = 0;
        let EXP = 0;
        let TFI = 0;
        let TFE = 0;
        const transactions = db.transactions.filter(
          (t) => t.categoryId === category.id
        );

        for (let j = 0; j < transactions.length; j++) {
          const transaction = transactions[j];

          switch (transaction.type) {
            case "INC":
              INC = INC + transaction.value * 100;
              break;

            case "EXP":
              EXP = EXP + transaction.value * 100;
              break;

            case "TFI":
              TFI = TFI + transaction.value * 100;
              break;

            case "TFE":
              TFE = TFE + transaction.value * 100;
              break;

            default:
          }
        }

        datasets.push({
          y: category.name,
          INC: INC / 100,
          EXP: EXP / 100,
          TFI: TFI / 100,
          TFE: TFE / 100,
        });
      }

      debug("uuid", uuid());
      debug("db", db);

      res.send([...datasets]);
    }
  );
}

function getDashboardChartMonth(req, res) {
  const months = [
    { short: "Jan", num: 0, name: "January" },
    { short: "Feb", num: 1, name: "February" },
    { short: "Mar", num: 2, name: "March" },
    { short: "Apr", num: 3, name: "April" },
    { short: "May", num: 4, name: "May" },
    { short: "Jun", num: 5, name: "June" },
    { short: "Jul", num: 6, name: "July" },
    { short: "Aug", num: 7, name: "August" },
    { short: "Sep", num: 8, name: "September" },
    { short: "Oct", num: 9, name: "October" },
    { short: "Nov", num: 10, name: "November" },
    { short: "Dec", num: 11, name: "December" },
  ];
  const operations = ["INC", "EXP", "TFI", "TFE"];
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
      const datasets = [];

      for (let i = 0; i < months.length; i++) {
        let INC = 0;
        let EXP = 0;
        let TFI = 0;
        let TFE = 0;
        const month = months[i];
        const transactions = db.transactions.filter((t) => {
          const date = new Date(t.date);
          return date.getMonth() === month.num;
        });

        for (let j = 0; j < transactions.length; j++) {
          const transaction = transactions[j];

          switch (transaction.type) {
            case "INC":
              INC = INC + transaction.value * 100;
              break;

            case "EXP":
              EXP = EXP + transaction.value * 100;
              break;

            case "TFI":
              TFI = TFI + transaction.value * 100;
              break;

            case "TFE":
              TFE = TFE + transaction.value * 100;
              break;

            default:
          }
        }

        datasets.push({
          y: month.name,
          INC: INC / 100,
          EXP: EXP / 100,
          TFI: TFI / 100,
          TFE: TFE / 100,
        });
      }

      debug("uuid", uuid());
      debug("db", db);

      res.send([...datasets]);
    }
  );
}

function getDashboardTable(req, res) {
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

function getDashboardTableSources(req, res) {
  const currency = req.params.currency;
  debug("path", currency, path.join(__dirname, "..", "db.json"));

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
        ...db.sources
          .filter((s) => s.currency === currency)
          .map((source) => ({
            ...source,
            balance:
              (source.balance * 100 +
                (db.transactions
                  .filter((t) => t.sourceId === source.id)
                  .reduce((acc, t) => {
                    switch (t.type) {
                      case "INC":
                        return acc + t.value * 100;

                      case "EXP":
                        return acc - t.value * 100;

                      case "TFI":
                        return acc + t.value * 100;

                      case "TFE":
                        return acc - t.value * 100;

                      default:
                        return acc;
                    }
                  }, 0) || 0)) /
              100,
          })),
      ]);
    }
  );
}

module.exports = router;
