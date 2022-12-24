const users = [];
const messages = [];
const addUser = ({ id, name, randomRoomNumber }) => {
    // console.log(id);
    name = name.trim().toLowerCase();
    room = randomRoomNumber.trim().toLowerCase();
    // initialMessage =[{name:"admin",message:`${name} is joined this room`}];
    const existingUser = users.find(
        (user) => user.room === room && user.name === name
    );

    if (existingUser) {
        return { error: "Username is taken" };
    }

    const user = { id, name, room };
    const message = { room };
    users.push(user);
    messages.push(message);
    // console.log(users);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUserRoomByName = (name) => {
    return users.filter((user) => user.name === name);
};

const saveText = (userName, roomNumber, text) => {
    // console.log(userName, roomNumber,text)
    // const messageList = { userName,roomNumber, text };
    // console.log("roomNumber" + roomNumber);
    // console.log("message" + text);
    const roomIndex = messages.findIndex(
        (message) => message.room === roomNumber
    );
    // console.log("roomIndex" + roomIndex);
    const currentMessage = messages[roomIndex].message;
    if (currentMessage === undefined) {
        messages[roomIndex].message = [{ name: userName, text }];
    } else {
        messages[roomIndex].message = [...currentMessage, { name: userName, text }];
    }
    console.log(messages[0]);
    // return users.filter((user) => user.name === name);
};

const findMessages = (roomNumber) => {
    const findMessage = messages.find((message) => message.room === roomNumber);
    return findMessage.message;
};
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getUserRoomByName,
    saveText,
    findMessages,
};