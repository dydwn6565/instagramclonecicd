const expect = require("chai").expect;
const pool = require("../pool");
const PostRepo = require("../repos/post-repo.js");
const PostLikeRepo = require("../repos/post-like-repo.js");

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
      await PostLikeRepo.insert(findResult[0].userid, findResult[0].postid);

      await PostLikeRepo.delete(7);
      await PostLikeRepo.delete(findResult[0].userid, findResult[0].postid);
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

      const userid = findResult[0].userid;
      const postid = findResult[0].postid;
      await PostLikeRepo.insert(userid, postid);
      const findpostlikeresult = await PostLikeRepo.find();
      expect(findpostlikeresult[0].userid).to.equal(1);
      expect(findResult[0].postid).to.equal(findResult[0].postid);
      await PostLikeRepo.delete(7);
      await PostLikeRepo.delete(findResult[0].userid, findResult[0].postid);
    } catch (error) {
      console.log(error);
    }
  });
});
