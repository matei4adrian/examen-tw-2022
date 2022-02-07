const ShipDB = require("../models").Ship;

const controller = {
  getAllShips: async (req, res) => {
    const obj = {};
    if (req.query.name || req.query.displacement || req.query.sortBy) {
      obj.where = {};
    }
    if (req.query.name) {
      obj.where.name = req.query.name;
    }
    if (req.query.displacement) {
      obj.where.displacement = req.query.displacement;
    }
    if (req.query.sortBy) {
      obj.order = [[req.query.sortBy, "ASC"]];
    }

    ShipDB.findAll(obj)
      .then((ships) => {
        res.status(200).send(ships);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  addShip: async (req, res) => {
    if (req.body.name.length < 3 || req.body.displacement < 50) {
      res.status(400).send({ message: "Invalid ship!" });
    } else {
      ShipDB.create(req.body)
        .then((ship) => {
          res.status(200).send(ship);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error" });
        });
    }
  },
  updateShip: async (req, res) => {
    if (
      (req.body.name && req.body.name.length < 3) ||
      req.body.displacement < 50
    ) {
      res.status(400).send({ message: "Invalid ship" });
    } else {
      ShipDB.findByPk(req.params.shipId)
        .then(async (ship) => {
          if (ship) {
            Object.assign(ship, req.body);
            await ship.save();
            res.status(202).send({ message: "Ship updated!" });
          } else {
            res.status(404).json({ message: "Ship not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  deleteShip: async (req, res) => {
    ShipDB.findByPk(req.params.shipId)
      .then(async (ship) => {
        if (ship) {
          await ship.destroy();
          res.status(202).send({ message: "Ship deleted!" });
        } else {
          res.status(404).json({ message: "Ship not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
