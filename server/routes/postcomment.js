const express = require("express");
const router = express.Router();
const postcommentRepo = require("../repos/post-comment-repo");

router.get("/get/postcomment/:postid", async (req, res) => {
  const postid = req.params.postid;

  try {
    const commentsList = await postcommentRepo.findById({ postid });
    res.status(201).json(commentsList);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add/postcomment", async (req, res) => {
  console.log(req.body);
  const comment = req.body.comment;
  const userid = req.body.userid;
  const postid = req.body.postid;
  try {
    const resultInsertComment = await postcommentRepo.insert({
      comment,
      userid,
      postid,
    });
    res.status(201).json({ message: "successfully inserted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
