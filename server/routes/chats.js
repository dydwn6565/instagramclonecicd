const express = require("express");
const router = express.Router();
const { getUserRoomByName } = require("../users");
const { getUsersInRoom } = require("../repos/chat-repo");

router.get("/chat/getUserRoom/:userid", async(req, res) => {
    const userid = req.params.userid;

    const getUserRoom = await getUsersInRoom(userid);
    // const ids = getUserRoom.map((o) => o.id);
    
    // const filtered = getUserRoom.filter(
    //     ({ id }, index) => !ids.includes(id, index + 1)
    // );
// console.log(filtered)
    res.status(201).json(getUserRoom);
});

module.exports = router;