const express = require("express");
const router = express.Router();
const multer = require("multer");
const PostRepo = require("../repos/post-repo");
const fs = require("fs");
const { imageUploader } = require("../middleware/fileFilter");
router.post("/post",imageUploader, async (req, res) => {
  
  console.log(req)
  
  const files = req.files;
  
  const content = req.body.content;
  const lat = Number(req.body.lat);
  const long = Number(req.body.long);
  const userid = Number(req.body.userid);
    
  
  PostRepo.insert(files, content, lat, long, userid)
    .then((result) => {
      
      res.status(201).json({ message: "images are saved" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });

  
});

router.get("/retrive/posts", async (req, res) => {
  console.log("hit");
  const postsData = await PostRepo.find();
  
  

  /* localstorage case */
  // postsData.map((post) =>{
  //   post.url =fs.readFileSync(`${post.filepath}`,"base64")
  // })
  // const newArray = [];
  // const newValue = postsData.map((post, index, arr) => {
  //   const filteredPosts = arr.filter((arrPost, arrIndex) => {
  //     return post.postid === arrPost.postid;
  //   });
  //   let tempFilteredPosts = filteredPosts[0];
    
    
  //   const filteredURL= filteredPosts.map((filteredPost, filteredIndex) => {
      
  //     return filteredPost.url;
  //   });
    
  //   post.url = filteredURL;
    
  //   newArray.push(tempFilteredPosts);
    

  // });
  const newArray = [];
  const newValue = postsData.map((post, index, arr) => {
    const filteredPosts = arr.filter((arrPost, arrIndex) => {
      return post.postid === arrPost.postid;
    });
    let tempFilteredPosts = filteredPosts[0];

    const filteredURL = filteredPosts.map((filteredPost, filteredIndex) => {
      return filteredPost.filepath;
    });

    post.filepath = filteredURL;

    newArray.push(tempFilteredPosts);
  });
  console.log(newArray)
  return res.status(201).json([ ...new Set(newArray)]);
  

});

module.exports = router;
