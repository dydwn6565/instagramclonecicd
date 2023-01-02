const expect = require("chai").expect;
const pool = require("../pool");
const User = require("../routes/users.js");
const LoginRepo = require("../repos/login-repo.js");
const UserRepo = require("../repos/user-repo.js");
const {
  addUser,
  getUsersInRoom,
  saveText,
  saveImage,
  findMessages,
} = require("../repos/chat-repo.js");

describe("chat addUser and getUser ", function () {
  step("chat addUser and getUser ", function (done) {
    pool
      .connect({
        host: "localhost",
        port: 5432,
        database: "postgres",
        user: "postgres",
        password: "dydwn6565",
      })

      .then(async () => {
        await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
        try {
          const firstUserData = {
            id: "dydwn6565",

            name: "yongju",
            password: 1234567,
            username: "",
          };
          await UserRepo.insert(
            firstUserData.id,
            firstUserData.name,
            firstUserData.username,
            firstUserData.password
          );
          const secondUserData = {
            id: "song119",

            name: "songsull",
            password: 1234567,
            username: "",
          };
          await UserRepo.insert(
            secondUserData.id,
            secondUserData.name,
            secondUserData.username,
            secondUserData.password
          );
          const thridUserData = {
            id: "sekyung12",

            name: "sekyung",
            password: 555,
            username: "",
          };
          await UserRepo.insert(
            thridUserData.id,
            thridUserData.name,
            thridUserData.username,
            thridUserData.password
          );
          const chatData = {
            id: 1,
            clickedUserList: [secondUserData.name, thridUserData.name],
            randomRoomNumber: 5512,
          };
          await addUser(
            chatData.id,
            chatData.clickedUserList,
            chatData.randomRoomNumber
          );
          const chatMessages = {
            text: "testText",

            userid: 1,
            roomnumber: 5512,
          };

          const saveTextResult = await saveText(
            chatMessages.roomnumber,
            chatMessages.userid,
            chatMessages.text
          );
          const getuserResult = await getUsersInRoom(
            
            chatData.id
          );

          const findmessageResult = await findMessages(
            
            chatData.randomRoomNumber
          );
          
          expect(findmessageResult[0].text).to.equal("testText");
          expect(findmessageResult[0].roomnumber).to.equal("5512");
          expect(findmessageResult[0].userid).to.equal("dydwn6565");
          expect(findmessageResult[0].name).to.equal("yongju");
          expect(findmessageResult[0].password).to.equal("1234567");
          await pool.query("truncate chatmessages cascade");

          // await pool.query("truncate users cascade");
          done()
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.error(err));
  });
});

