// const expect = require("chai").expect;
// const pool = require("../pool");
// const StoryRepo = require("../repos/story-repo.js");

// describe("UserRepo", function () {

//      it("start" ,function () {
//        pool
//          .connect({
//            host: "localhost",
//            port: 5432,
//            database: "postgres",
//            user: "postgres",
//            password: "dydwn6565",
//          })

//          .then(async () => {
//            try {
//              const stories = await StoryRepo.find();

//             expect(stories[0].id).to.equal(5);            
//             expect(stories[0].url).to.equal("https://picsum.photos/1080/1920");
//             expect(stories[0].heading).to.equal("Mohit Karekar");
//             expect(stories[0].subheading).to.equal("Posted 5h ago");
//             expect(stories[0].profileimage).to.equal(
//               "https://picsum.photos/1000/1000"
//             );
//             expect(stories[0].type).to.equal(null);
//             expect(stories[0].duration).to.equal(null);
//             expect(stories[0].userid).to.equal(7);
//            } catch (error) {
//              console.log(error);
//            }
//          })
//          .catch((err) => console.error(err));
//      });

//     })