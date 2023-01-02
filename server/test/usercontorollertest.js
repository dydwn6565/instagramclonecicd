const expect = require("chai").expect;
const sinon = require("sinon");
const pool = require("../pool");

const User = require("../routes/users.js");
const UserRepo = require("../repos/user-repo.js");

describe("UserRepo", function () {
  it("start", async function () {
    try {
      const stubValue = {
        id: "dydwn65656",

        name: "yongju",
        password: 1234567,
        username: "",
      };

      const user = await UserRepo.insert(
        stubValue.id,
        stubValue.name,
        stubValue.username,
        stubValue.password
      );
      await UserRepo.delete("dydwn6565");
    } catch (error) {
      console.log(error);
    }
  });
  describe("find", function () {
    it("should find a user", async function () {
      const stubValue = {
        id: "dydwn6565",
        createdAt: "",
        updatedAt: "",
        userId: "dydwn45",
        name: "yongju",
        password: 1234567,
        username: "",
        email: "dydwn6565@naver.com",
        bio: "",
        avatar: "",
        status: "",
      };

      const stub = sinon.stub(UserRepo, "find").returns(stubValue);

      const user = await UserRepo.find();
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.userId).to.equal(stubValue.userId);
      expect(user.name).to.equal(stubValue.name);
      expect(user.password).to.equal(stubValue.password);
      expect(user.username).to.equal(stubValue.username);
      expect(user.email).to.equal(stubValue.email);
      expect(user.bio).to.equal(stubValue.bio);
      expect(user.avatar).to.equal(stubValue.avatar);
      expect(user.status).to.equal(stubValue.status);
    });
  });
  describe("findById", function () {
    it("should find by id", async function () {
      const stubValue = {
        id: "dydwn6565",
        createdAt: "",
        updatedAt: "",
        userId: "dydwn45",
        name: "yongju",
        password: 1234567,
        username: "",
        email: "dydwn6565@naver.com",
        bio: "",
        avatar: "",
        status: "",
      };

      const stub = sinon.stub(UserRepo, "findById").returns(stubValue.id);

      const user = await UserRepo.findById(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equal(stubValue.id);
    });
  });
  describe("findByuserId", function () {
    it("should find by userId", async function () {
      const stubValue = {
        id: "dydwn6565",
        createdAt: "",
        updatedAt: "",
        userId: "dydwn45",
        name: "yongju",
        password: 1234567,
        username: "",
        email: "dydwn6565@naver.com",
        bio: "",
        avatar: "",
        status: "",
      };

      const stub = sinon.stub(UserRepo, "findByuserId").returns(stubValue);

      const user = await UserRepo.findByuserId(stubValue.userId);

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.userId).to.equal(stubValue.userId);
      expect(user.name).to.equal(stubValue.name);
      expect(user.password).to.equal(stubValue.password);
      expect(user.username).to.equal(stubValue.username);
      expect(user.email).to.equal(stubValue.email);
      expect(user.bio).to.equal(stubValue.bio);
      expect(user.avatar).to.equal(stubValue.avatar);
      expect(user.status).to.equal(stubValue.status);
    });
  });

  describe("findById", function () {
    it("create user", async function () {
      try {
        const stubValue = {
          id: "dydwn6565",

          name: "yongju",
          password: 1234567,
          username: "",
        };

        const user = await UserRepo.insert(
          stubValue.id,
          stubValue.name,
          stubValue.username,
          stubValue.password
        );
        await UserRepo.delete("dydwn6565");
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe("find all user", function () {
    it("find all user", async function () {
      const stubValue = {
        id: "dydwn6565",

        name: "yongju",
        password: 1234567,
        username: "",
      };
      const user = await UserRepo.find();

      expect(user.id).to.equal("dydwn6565");
      expect(user.name).to.equal("yongju");
      expect(user.password).to.equal(1234567);
      expect(user.username).to.equal("");
    });

    describe("find by ids", function () {
      it("find by ids", async function () {
        const user = await UserRepo.findById("dydwn6565");

        expect(user).to.equal("dydwn6565");
      });
    });
  });
  describe("find by userid", function () {
    it("find by userid", async function () {
      const user = await UserRepo.findByuserId("dydwn6565");

      expect(user.id).to.equal("dydwn6565");
      expect(user.name).to.equal("yongju");
      expect(user.password).to.equal(1234567);
      expect(user.username).to.equal("");
    });
  });
  describe("update userinfo", function () {
    it("update userinfo", async function () {
      const userinfo = {
        id: "dydwn6565",

        name: "yongju",
        password: 1234567,
        username: "",
      };
      await UserRepo.insert(
        userinfo.id,
        userinfo.name,
        userinfo.username,
        userinfo.password
      );

      const user = await UserRepo.update(
        1,
        "dydwn6565",
        "yongKi",
        112,
        "",
        "",
        ""
      );
      await UserRepo.delete("dydwn65656");
    });
  });
});
