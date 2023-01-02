const expect = require("chai").expect;
const pool = require("../pool");
const UserRepo = require("../repos/user-repo.js");
const LoginRepo = require("../repos/login-repo.js");

describe("login activity insert, find and delete", function () {
  it("login activity insert, find and delete",async function () {
    
        try {
        
          const loginData = {
            lat: "123",
            long: "456",
            userid: 1,
          };

          await LoginRepo.insert(
            loginData.lat,
            loginData.long,
            loginData.userid
          );

          const findResult = await LoginRepo.find();
        
          expect(findResult[0].lat).to.equal(123);
          expect(findResult[0].long).to.equal(456);
          expect(findResult[0].userid).to.equal(1);
          await pool.query("truncate login cascade");
        
        
        } catch (error) {
          console.log(error);
        }
    
  });
});
