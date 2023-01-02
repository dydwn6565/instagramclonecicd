const expect = require("chai").expect;
const pool = require("../pool");
const PostRepo = require("../repos/post-repo.js");

describe("PostRepo", function () {
  it("start",async function () {
    // pool
    //   .connect({
    //     host: "localhost",
    //     port: 5432,
    //     database: "postgres",
    //     user: "postgres",
    //     password: "dydwn6565",
    //   })

    //   .then(async () => {
        try {
          const postData = {
            content: "postcontent",
            lat: "123",
            long: "456",
            userid: 1,
          };
        //   const created_at = new Date("2022-10-26 05:07:57.542971+00");
        //   const updated_at = new Date("2022-10-26 05:07:57.542971+00");
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
          if (postresult === 1) {
            await PostRepo.delete(7);
          }
        } catch (error) {
          console.log(error);
        }
    //   })
    //   .catch((err) => console.error(err));
  });
});
describe("post find", function () {
  it("post find",async function () {
    // pool
    //   .connect({
    //     host: "localhost",
    //     port: 5432,
    //     database: "postgres",
    //     user: "postgres",
    //     password: "dydwn6565",
    //   })

    //   .then(async () => {
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

          expect(findResult[0].content).to.equal("postcontent");
          expect(findResult[0].lat).to.equal(123);
          expect(findResult[0].long).to.equal(456);
          expect(findResult[0].userid).to.equal(1);
          expect(findResult[0].filename).to.equal(
            "mukul-wadhwa-xpo5BggQo3E-unsplash.jpg"
          );
          expect(findResult[0].filepath).to.equal(
            "https://instagramdb.s3.us-west-1.amazonaws.com/2022-10-26T05-07-56.223Z%2Cmukul-wadhwa-xpo5BggQo3E-unsplash.jpg"
          );
        
          await PostRepo.delete(7);
          
        } catch (error) {
          console.log(error);
        }
    //   })
    //   .catch((err) => console.error(err));
  });
});
describe("findById post", function () {
  it("findById post", async function () {
 
    try {
    //   const postData = {
    //     content: "postcontent",
    //     lat: "123",
    //     long: "456",
    //     userid: 1,
    //   };

    //   const files = [
    //     {
    //       originalname: "mukul-wadhwa-xpo5BggQo3E-unsplash.jpg",
    //       location:
    //         "https://instagramdb.s3.us-west-1.amazonaws.com/2022-10-26T05-07-56.223Z%2Cmukul-wadhwa-xpo5BggQo3E-unsplash.jpg",
    //     },
    //   ];

    //   const postresult = await PostRepo.insert(
    //     files,
    //     postData.content,
    //     postData.lat,
    //     postData.long,
    //     postData.userid
    //   );
      const findByIdResult = await PostRepo.findById(1);

      expect(findByIdResult[0].content).to.equal("postcontent");
      expect(findByIdResult[0].lat).to.equal(123);
      expect(findByIdResult[0].long).to.equal(456);
      expect(findByIdResult[0].userid).to.equal(1);

      
      await PostRepo.delete(7);
      
    } catch (error) {
      console.log(error);
    }
 
  });
});
describe("update post", function () {
  it("update post", async function () {
  
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

      const getpost = await PostRepo.find();

      if (getpost[0].id) {
        await PostRepo.update(
          "update.jpg",
          "update",
          getpost[0].postid,
          "updatepostcontent",
          111,
          222,
          1,
          getpost[0].id
        );
        const getupdatedpost = await PostRepo.find();
        
        expect(getupdatedpost[4].content).to.equal("updatepostcontent");
        expect(getupdatedpost[4].lat).to.equal(111);
        expect(getupdatedpost[4].long).to.equal(222);
        expect(getupdatedpost[4].userid).to.equal(1);
        expect(getupdatedpost[4].filename).to.equal("update.jpg");

        await PostRepo.delete(7);
      }
    } catch (error) {
      console.log(error);
    }
    
  });
});
