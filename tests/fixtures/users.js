const { ObjectId } = require("mongoose").Types;

const data = [
  {
    _id: "111aaaaaaaaaaaaaaaaaa111",
    username: "user1",
    password: "$2b$10$mrFk.FVF7XDGfcFNjnWNReipkY8MlOHc1tXLLQUIvPgmnPGwaAa4m",
    googleId: "111111111111111111111",
    googleName: "Google User 1",
    googlePic: "https://www.example.com/google/pic1",
    facebookId: "1111111111111111",
    facebookName: "Facebook User 1",
    facebookPic: "https://www.example.com/facebook/pic1",
    primaryAccount: "local",
    __v: 0,
    email: "user1@example.com",
  },
  {
    _id: "222aaaaaaaaaaaaaaaaaa222",
    username: "user2",
    password: "$2b$10$dHMudeAkukkK6O2zWMIYPuXttQedcjRMwrKP8g4K0J1aOsfJ0nqzS",
    googleId: "222222222222222222222",
    googleName: "Google User 2",
    googlePic: "https://www.example.com/google/pic2",
    facebookId: null,
    facebookName: null,
    facebookPic: null,
    primaryAccount: "google",
    __v: 0,
    email: "user2@example.com",
  },
  {
    _id: "333aaaaaaaaaaaaaaaaaa333",
    username: null,
    password: null,
    googleId: null,
    googleName: null,
    googlePic: null,
    facebookId: "3333333333333333",
    facebookName: "Facebook User 3",
    facebookPic: "https://www.example.com/facebook/pic3",
    primaryAccount: "facebook",
    __v: 0,
    email: "user3@example.com",
  },
];

for (let sub of data) {
  sub._id = new ObjectId(sub._id);
}

module.exports = data;
