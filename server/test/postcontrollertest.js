const expect = require("chai").expect;
const pool = require("../pool");
const PostRepo = require("../repos/post-repo.js");

describe("PostRepo", function () {
  it("start", function () {
    pool
      .connect({
        host: "localhost",
        port: 5432,
        database: "postgres",
        user: "postgres",
        password: "dydwn6565",
      })

      .then(async () => {
        try {
          const postData = {
               content: "postcontent",
               lat: "123",
               long: "456",
               userid: 7,
             };
             const created_at = new Date("2022-10-26 05:07:57.542971+00");
             const updated_at = new Date("2022-10-26 05:07:57.542971+00");
          const files = [
            {
              //   created_at: created_at,
              //   updated_at: updated_at,
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
             if (postresult===1){

                 await PostRepo.delete(7);
             } 
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.error(err));
  });
//   describe("find", function () {
//     it("should find a user", async function () {
//       const stubValue = {
//         id: "dydwn6565",
//         createdAt: "",
//         updatedAt: "",
//         userId: "dydwn45",
//         name: "yongju",
//         password: 1234567,
//         username: "",
//         email: "dydwn6565@naver.com",
//         bio: "",
//         avatar: "",
//         status: "",
//       };

//       const stub = sinon.stub(UserRepo, "find").returns(stubValue);
//       //   const userService = new UserService(userRepo);
//       const user = await UserRepo.find();
//       expect(stub.calledOnce).to.be.true;
//       expect(user.id).to.equal(stubValue.id);
//       expect(user.createdAt).to.equal(stubValue.createdAt);
//       expect(user.userId).to.equal(stubValue.userId);
//       expect(user.name).to.equal(stubValue.name);
//       expect(user.password).to.equal(stubValue.password);
//       expect(user.username).to.equal(stubValue.username);
//       expect(user.email).to.equal(stubValue.email);
//       expect(user.bio).to.equal(stubValue.bio);
//       expect(user.avatar).to.equal(stubValue.avatar);
//       expect(user.status).to.equal(stubValue.status);
//     });
//   });
});
