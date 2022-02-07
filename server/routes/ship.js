const express = require("express");
const router = express.Router();
const shipController = require("../controllers").ship;
const crawMemberController = require("../controllers").crawMember;

router.get("/", shipController.getAllShips);
router.post("/", shipController.addShip);
router.put("/:shipId", shipController.updateShip);
router.delete("/:shipId", shipController.deleteShip);

router.get(
  "/:shipId/crawMembers",
  crawMemberController.getAllCrawMembersOfShip
);
router.post("/:shipId/crawMembers", crawMemberController.addCrawMembersOnShip);
router.put(
  "/:shipId/crawMembers/:crawMemberId",
  crawMemberController.updateCrawMemberOfShip
);
router.delete(
  "/:shipId/crawMembers/:crawMemberId",
  crawMemberController.deleteCrawMemberOfShip
);

module.exports = router;
