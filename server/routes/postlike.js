const express = require("express");
const router = express.Router();
const postlikeRepo = require("../repos/post-like-repo");

router.post("/add/postlike", async (req, res) => {
  console.log(req.body);

  const userid = req.body.userid;
  const postid = req.body.postid;
  try {
    await postlikeRepo.insert({ userid, postid });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/postlike", async (req, res) => {
  console.log(req.body);

  const userid = req.body.userid;
  const postid = req.body.postid;
  try {
    await postlikeRepo.delete({ userid, postid });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
