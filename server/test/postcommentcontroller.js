const expect = require("chai").expect;
const pool = require("../pool");
const PostRepo = require("../repos/post-repo.js");
const PostCommentRepo = require("../repos/post-comment-repo.js");
const UserRepo = require("../repos/user-repo.js");
describe("post like insert", function () {
  it("post like insert", async function () {
    try {
      const postData = {
        content: "postcontent",
        lat: "123",
        long: "456",
        userid: 1,
      };

      const files = [
        {
          originalname: "mukul-wadhwa-xpo5BggQo3E-unsplash.jpg",
          location:
            "https://instagramdb.s3.us-west-1.amazonaws.com/2022-10-26T05-07-56.223Z%2Cmukul-wadhwa-xpo5BggQo3E-unsplash.jpg",
        },
      ];

      const postresult = await PostRepo.insert(
        files,
        postData.content,
        postData.lat,
        postData.long,
        postData.userid
      );

      const findResult = await PostRepo.find();

      const postcomment = await PostCommentRepo.insert(
        "postcommentTest",
        findResult[0].userid,
        findResult[0].postid
      );

      await PostRepo.delete(7);
      await PostCommentRepo.delete(findResult[0].userid, findResult[0].postid);
    } catch (error) {
      console.log(error);
    }
  });
});
describe("find post like and delete", function () {
  it("find post like and delete", async function () {
    try {
      const postData = {
        content: "postcontent",
        lat: "123",
        long: "456",
        userid: 1,
      };

      const files = [
        {
          originalname: "mukul-wadhwa-xpo5BggQo3E-unsplash.jpg",
          location:
            "https://instagramdb.s3.us-west-1.amazonaws.com/2022-10-26T05-07-56.223Z%2Cmukul-wadhwa-xpo5BggQo3E-unsplash.jpg",
        },
      ];

      await PostRepo.insert(
        files,
        postData.content,
        postData.lat,
        postData.long,
        postData.userid
      );

      const findResult = await PostRepo.find();

      await PostCommentRepo.insert(
        "postcommentTest",
        findResult[0].userid,
        findResult[0].postid
      );
      const findpostlikeresult = await PostCommentRepo.findById(
        findResult[0].postid
      );
      expect(findpostlikeresult[0].userid).to.equal(1);
      expect(findpostlikeresult[0].postid).to.equal(findResult[0].postid);
      expect(findpostlikeresult[0].comment).to.equal("postcommentTest");
      await PostRepo.delete(7);
      await PostCommentRepo.delete(findResult[0].userid, findResult[0].postid);
    } catch (error) {
      console.log(error);
    }
  });
});
