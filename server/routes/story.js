const express = require("express");
const router = express.Router();
const StoryRepo = require("../repos/story-repo");
router.get("/stories", async(req, res) => {
    const stories = await StoryRepo.find();
    res.status(201).json({ stories });
});

module.exports = router;