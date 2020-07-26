const { ObjectId } = require("mongoose").Types;

const data = [
  {
    _id: "111cccccccccccccccccc111",
    os: "MacOS",
    browser: "Chrome",
    endpoint: "https://example.com/endpoint/1",
    auth: "AAAJvmfdGcdimAutRLiAAA",
    p256dh: "AAA---r7sJU95df2sXoeoX3AX1YwtrEEZrw7AqgVd3wmo05ru-EO8CPvCUPqIBcs15hsxVhy12kfI8Jjf---AAA",
    user: "111aaaaaaaaaaaaaaaaaa111",
    __v: 0,
  },
  {
    _id: "222cccccccccccccccccc222",
    os: "Linux",
    browser: "Firefox",
    endpoint: "https://example.com/endpoint/2",
    auth: "BBBJvmfdGcdimAutRLiBBB",
    p256dh: "BBB---r7sJU95df2sXoeoX3AX1YwtrEEZrw7AqgVd3wmo05ru-EO8CPvCUPqIBcs15hsxVhy12kfI8Jjf---BBB",
    user: "111aaaaaaaaaaaaaaaaaa111",
    __v: 0,
  },
  {
    _id: "333cccccccccccccccccc333",
    os: "Window",
    browser: "MSIE",
    endpoint: "https://example.com/endpoint/3",
    auth: "CCCJvmfdGcdimAutRLiCCC",
    p256dh: "CCC---r7sJU95df2sXoeoX3AX1YwtrEEZrw7AqgVd3wmo05ru-EO8CPvCUPqIBcs15hsxVhy12kfI8Jjf---CCC",
    user: "222aaaaaaaaaaaaaaaaaa222",
    __v: 0,
  },
];

for (let sub of data) {
  sub._id = new ObjectId(sub._id);
  sub.user = new ObjectId(sub.user);
}

module.exports = data;
