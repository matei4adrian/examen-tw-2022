const ShipDB = require("./../models").Ship;
const CrawMemberDB = require("./../models").CrawMember;

const controller = {
  getAllCrawMembersOfShip: async (req, res) => {
    ShipDB.findByPk(req.params.shipId, { include: [CrawMemberDB] })
      .then((ship) => {
        if (ship) {
          res.status(200).send(ship.CrawMembers);
        } else {
          res.status(404).send({ message: "Ship not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
  addCrawMembersOnShip: async (req, res) => {
    if (
      req.body.name.length < 5 ||
      (req.body.role != "CAPTAIN" && req.body.role != "BOATSWAIN")
    ) {
      res.status(400).send({ message: "Invalid craw member!" });
    } else {
      ShipDB.findByPk(req.params.shipId)
        .then((ship) => {
          if (ship) {
            ship
              .createCrawMember(req.body)
              .then((crawMember) => {
                res.status(201).send(crawMember);
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(404).send({ message: "Ship not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  updateCrawMemberOfShip: async (req, res) => {
    if (
      req.body.name.length < 5 ||
      (req.body.role != "CAPTAIN" && req.body.role != "BOATSWAIN")
    ) {
      res.status(400).send({ message: "Invalid craw member!" });
    } else {
      ShipDB.findByPk(req.params.shipId)
        .then((ship) => {
          if (ship) {
            ship
              .getCrawMembers({ where: { id: req.params.crawMemberId } })
              .then(async (crawMembers) => {
                const crawMember = crawMembers.shift();
                if (crawMember) {
                  Object.assign(crawMember, req.body);
                  await crawMember.save();
                  res.status(202).send({ message: "Craw member updated!" });
                } else {
                  res.status(404).send({ message: "Craw member not found!" });
                }
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(404).send({ message: "Ship not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  deleteCrawMemberOfShip: async (req, res) => {
    ShipDB.findByPk(req.params.shipId)
      .then((ship) => {
        if (ship) {
          ship
            .getCrawMembers({ where: { id: req.params.crawMemberId } })
            .then(async (crawMembers) => {
              const crawMember = crawMembers.shift();
              if (crawMember) {
                await crawMember.destroy();
                res.status(202).send({ message: "Craw member deleted!" });
              } else {
                res.status(404).send({ message: "Craw member not found!" });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send({ message: "Server error!" });
            });
        } else {
          res.status(404).send({ message: "Shift not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
