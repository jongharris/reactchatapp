//helper functions for index.js

const users = [];

const addUser = ({id, name, room, nickColor}) => {
    //set up name and room, trim whitespace, put to lower case
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user)=> user.room === room && user.name === name);
    if (existingUser) {
        return {error: "Username taken"};
    }

    const user = {id, name, room, nickColor};
    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id ===id)

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

//return an array of all users in room
const getUsersInRoom = (room) => users.filter((user) =>user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};