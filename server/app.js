const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const pool = require("./pool");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const chatRouter = require("./routes/chats");
const storyRouter = require("./routes/story");
const loginRouter = require("./routes/login");
const postcommentRouter = require("./routes/postcomment");
const postlikeRouter = require("./routes/postlike");

const { fileStorage } = require("./middleware/fileFilter");
const { imageUploader } = require("./middleware/fileFilter");
const uuid = require("./utils/uuid");
const fs = require("fs");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  saveText,
  findMessages,
  saveImage,
} = require("./repos/chat-repo.js");

dotenv.config();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());

app.use(express.static(path.join(__dirname, "images")));
app.use(bodyparser.json({ limit: "50mb" }));

app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://instagramclone-nine.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on(
    "join",
    async ({ userid, clickedUserList, randomRoomNumber }, callback) => {
      await addUser({
        id: userid,
        clickedUserList,
        randomRoomNumber,
      });

      clickedUserList.map((name) => {
        socket.emit("message", {
          user: "admin",
          text: `${name}, welcome to the room `,
        });
        socket.broadcast.to(randomRoomNumber).emit("message", {
          user: "admin",
          text: `${name}, has joined!`,
        });
      });
      socket.join(randomRoomNumber);

      callback();
    }
  );
  socket.on("sendMessage", async ({ room, userid, message }, callback) => {
    const user = await getUser(room, userid);
    console.log(user);

    saveText(room, userid, message);
    io.to(room).emit("message", {
      name: user.rows[0].name,
      id: userid,
      text: message,
    });
    callback();
  });

  socket.on("sendImage", async ({ room, userid, b64 }, callback) => {
    const user = await getUser(room, userid);
    const splitted = b64.split(";base64,");
    const format = splitted[0].split("/")[1];

    const imageFormat =
      new Date().toISOString().replace(/:/g, "-") + "," + room + "." + format;

    fs.writeFileSync("images/" + imageFormat, splitted[1], {
      encoding: "base64",
    });
    saveImage(user.rows[0].id, user.rows[0].userid, imageFormat);
    io.to(room).emit("message", {
      name: user.rows[0].username,
      text: b64,
    });
    callback();
  });

  socket.on("rejoin", async ({ randomRoomNumber }) => {
    const userText = await findMessages(randomRoomNumber);

    socket.join(randomRoomNumber);
    io.to(randomRoomNumber).emit("rejoinMessage", userText);
  });

  socket.on("disconnect", () => {
    console.log("User had left!!");
  });
});

app.use(userRouter);
app.use(postRouter);
app.use(authRouter);
app.use(chatRouter);
app.use(storyRouter);
app.use(loginRouter);
app.use(postcommentRouter);
app.use(postlikeRouter);

const PORT = process.env.PORT || 8080;
pool
.connect({
  host: "host.docker.internal" ,
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "dydwn6565",
})
  // .connect({
  //   host: "ec2-44-207-133-100.compute-1.amazonaws.com",
  //   port: 5432,
  //   database: "d660oijlvdfrot",
  //   user: "tqqisvaowgdfzh",
  //   password:
  //     "3c633640d039fe10e9b84a9b6523e3e7392aaa10b7525def27fa011948fe3892",
  //   ssl: { rejectUnauthorized: false },
  // })
  .then(() => {
    try {
      server.listen(PORT, () => {
        console.log("Listing port on 8080");
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((err) => console.error(err));

