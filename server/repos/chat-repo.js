const pool = require("../pool");
const fs = require("fs");
const { userInfo } = require("os");
const users = [];
const messages = [];
const addUser = async ( id, clickedUserList, randomRoomNumber ) => {
  try {
    clickedUserList.map(async (name) => {
      
      pool
        .query("SELECT * FROM users WHERE name = $1;", [name])
        .then((result) => {
          // console.log(result.rows[0].id);
          pool
            .query(
              "SELECT * FROM chatrooms WHERE roomnumber =$1 AND userid =$2",
              [randomRoomNumber, result.rows[0].id]
            )
            .then((res) => {
              if (res.rows[0] === undefined) {
                pool.query(
                  "INSERT INTO chatrooms(roomnumber,userid) VALUES($1,$2) RETURNING id;",
                  [randomRoomNumber, result.rows[0].id]
                );
              }
            });
        });
    });
    const { rows } = await pool.query(
      "SELECT * FROM chatrooms WHERE roomnumber=$1  AND userid= $2;",
      [randomRoomNumber, id]
    );
    if (rows[0] === undefined) {
      const { rows } = await pool.query(
        "INSERT INTO chatrooms(roomnumber,userid) VALUES($1,$2) RETURNING id;",
        [randomRoomNumber, id]
      );
    }
  } catch (error) {
    console.log(error);
    return { error: "Username is taken" };
  }

  // const { rows } = await pool.query(
  //   "SELECT * FROM chatrooms WHERE roomnumber=$1  AND userid= $2;",
  //   [randomRoomNumber, id]
  // );
  // if (rows[0] === undefined) {

  //   const { rows } = await pool.query(
  //     "INSERT INTO chatrooms(roomnumber,userid) VALUES($1,$2) RETURNING id;",
  //     [randomRoomNumber,id]
  //   );

  //     const user = { id, name, room };
  //     return { user };

  // }
};

const removeUser = (id) => {
  try {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  } catch (error) {
    console.log(error);
  }
};

// const getUser = async (room, userid) => {
//   try {
//     const { rows } = await pool.query(
//       "SELECT name,username,userid FROM users WHERE id= $1;",
//       [userid]
//     );

//     return { rows };
//   } catch (error) {
//     console.log(eror);
//   }
// };

const getUsersInRoom = async (userid) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM chatrooms WHERE userid=$1 ;",
      [userid]
    );
    if (rows[0] !== undefined) {
      const userInRoom = [];
      const userInfoLists = [];
      await Promise.all(
        rows.map(async (chatRoom) => {
          const oneRoomUserList = await pool.query(
            "SELECT * FROM chatrooms WHERE roomnumber =$1 ",
            [chatRoom.roomnumber]
          );

          userInfoLists.push(oneRoomUserList.rows);
        })
      );
      // console.log(userInfoLists)
      await Promise.all(
        userInfoLists.map(async (userInfoList) => {
          await Promise.all(
            await userInfoList.map(async (user) => {
              const userInfoResult = await pool.query(
                "SELECT id,userid,name,username FROM users WHERE id=$1",
                [user.userid]
              );
             await userInfoResult.rows.map((us) => {
                return (us["roomnumber"] = user.roomnumber);
              });

              userInRoom.push(userInfoResult.rows[0]);
            })
          );
        })
      );
      // console.log(new Set(userInRoom))
      return userInRoom;
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserRoomByName = (name) => {
  return users.filter((user) => user.name === name);
};

const saveText = async (room, userid, message) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO chatmessages(text,userid,roomnumber) VALUES($1,$2,$3) RETURNING id;",
      [message, userid, room]
    );
    return 1;
  } catch (error) {
    console.log(error);
  }
};

const saveImage = async (chatroomsid, userid, imagepath) => {
  try {
    
    const { rows } = await pool.query(
      "INSERT INTO chatmessages(imagepath,userid,roomnumber) VALUES($1,$2,$3) RETURNING id;",
      [imagepath, userid, chatroomsid]
    );
    
    return 1;
  } catch (error) {
    console.log(error);
  }
};

const findMessages = async (randomRoomNumber) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM chatmessages INNER JOIN users ON chatmessages.userid =users.id AND chatmessages.roomnumber =$1;`,
      [randomRoomNumber]
    );

    rows.map((message) => {
      if (message.imagepath !== null) {
        let convertedImage = fs.readFileSync(
          "images\\" + `${message.imagepath}`,
          "base64"
        );
        message.text = "data:image/jpeg;base64," + convertedImage;
      }
    });

    return rows;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addUser,
  removeUser,
  // getUser,
  getUsersInRoom,
  getUserRoomByName,
  saveText,
  findMessages,
  saveImage,
};
