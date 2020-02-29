const express = require("express");
const router = express.Router();
const teamsController = require("../controller/teams-connect-controller");
router.post("/", teamsController.acceptData);
router.post("/auth", teamsController.auth);
router.get("/connect", teamsController.connectChk);
router.post("/result", teamsController.result);
module.exports = router;
