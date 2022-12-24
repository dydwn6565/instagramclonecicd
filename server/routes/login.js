const express = require("express");
const router = express.Router();

const loginRepo = require("../repos/login-repo");

router.get("/get/user/activity", async(req, res) => {
    const loginActivity = await loginRepo.find();
    res.status(201).json({ loginActivity });
});

router.post("/insert/login/activity", async(req, res) => {
    console.log(req.body.userLocation.lat);
    const lat = req.body.userLocation.lat;
    const long = req.body.userLocation.long;
    const userId = req.body.userId;
    await loginRepo.insert(lat, long, userId);
    res.status(201).json({ messae: "successfully inserted" });
});

module.exports = router;