// const expect = require("chai").expect;
// const sinon =require('sinon');
// const authMiddleware = require("../middleware/authorization.js");
// const jwt = require("jsonwebtoken");
// describe("auth middleware",function() {

//     it("should throw an error if no authorization header is present", function () {
//       const req = {
//         headers: {},
//       };
    
//       expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
//         "Not authenticated"
//       );
//     });
    
//     it("test middleware with jwt verify method", function () {
//       const req = {
//         headers: {
//             authorization:"Bearer xyz"
//         },
//       };
//       sinon.stub(jwt,"verify");
//       jwt.verify.returns({userId:"abc"})
    
//       authMiddleware(req,{},()=>{});
//       expect(req).to.have.property('userId');
//       expect(req).to.have.property('userId', "abc");
//       expect(jwt.verify.called).to.be.true;
//     //   expect(authMiddleware.bind(this, req, {}, () => {})).not.to.throw(
//         jwt.verify.restore();
//     });
//     });
// // })