const { ObjectId } = require("mongoose").Types;

const [user1, user2, user3] = require("./users").map((u) => u["_id"]);
const { FollowingStatuses: FS } = require("../../models/Manga");
const faker = require("faker");

// const THE_PAST = new Date("2000-01-01");
const THE_FUTURE = new Date("2100-01-01");

function getTimeStamp() {
  const createdAt = faker.date.future();
  const updatedAt = faker.date.between(createdAt, THE_FUTURE);
  return { createdAt, updatedAt };
}

function generateChapter(override) {
  return {
    isRead: false,
    _id: new ObjectId(),
    name: faker.lorem.words(),
    link: faker.internet.url(),
    ...getTimeStamp(),
    ...override,
  };
}

function generateChapters(num = null) {
  if (num === null) {
    num = faker.random.number() % 10;
  }
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(generateChapter());
  }
  return result;
}

let mangaCount = 1;

function mangaName() {
  return "Manga " + mangaCount++;
}

function generateManga(override) {
  const chapters = generateChapters();
  return {
    _id: new ObjectId(),
    isCompleted: false,
    following: FS.FOLLOWING,
    note: "",
    name: mangaName(),
    link: faker.internet.url(),
    image: faker.image.image(),
    chapters: chapters,
    user: user1,
    hidden: false,
    source: faker.lorem.word(),
    status: faker.random.number() % 4,
    newChapCount: 0,
    unreadChapCount: chapters.length,
    __v: 1,
    ...getTimeStamp(),
    ...override,
  };
}

module.exports = [
  generateManga({
    _id: new ObjectId("111eeeeeeeeeeeeeeeeee111"),
    link: "https://manga1.com",
    name: "Hello world",
    following: FS.FOLLOWING,
    status: 3,
    isCompleted: false,
    chapters: [
      generateChapter({ link: "https://example.com/chap6" }),
      generateChapter({ link: "https://example.com/chap5" }),
      generateChapter({ link: "https://example.com/chap4" }),
      generateChapter({ link: "https://example.com/chap3", isRead: true }),
      generateChapter({ link: "https://example.com/chap2", isRead: true }),
      generateChapter({ link: "https://example.com/chap1", isRead: true }),
    ],
    source: "src1",
    newChapCount: 2,
    unreadChapCount: 3,
  }),
  generateManga({
    _id: new ObjectId("222eeeeeeeeeeeeeeeeee222"),
    user: user2,
    following: FS.FOLLOWING,
    status: 3,
    isCompleted: false,
    chapters: [
      generateChapter(),
      generateChapter(),
      generateChapter(),
      generateChapter({ isRead: true }),
      generateChapter({ isRead: true }),
    ],
    newChapCount: 3,
    unreadChapCount: 3,
  }),
  generateManga({
    _id: new ObjectId("333eeeeeeeeeeeeeeeeee333"),
    user: user3,
    following: FS.FOLLOWING,
    status: 2,
    isCompleted: true,
    chapters: [generateChapter(), generateChapter({ isRead: true }), generateChapter({ isRead: true })],
    newChapCount: 1,
    unreadChapCount: 1,
  }),
  generateManga({
    _id: new ObjectId("444eeeeeeeeeeeeeeeeee444"),
    name: "WoRlD chó MÈO chuột",
    link: "https://manga4.com",
    following: FS.TO_READ,
    status: 1,
    hidden: true,
    isCompleted: false,
    chapters: [
      generateChapter({ link: "https://example.com/chap3", isRead: true }),
      generateChapter({ link: "https://example.com/chap2", isRead: true }),
      generateChapter({ link: "https://example.com/chap1", isRead: true }),
    ],
    source: "src1",
    newChapCount: 0,
    unreadChapCount: 0,
  }),
  generateManga({
    _id: new ObjectId("555eeeeeeeeeeeeeeeeee555"),
    name: "get Married When You Grow Up!",
    link: "https://manga5.com",
    following: FS.TO_READ,
    status: 0,
    isCompleted: true,
    chapters: [
      generateChapter({ link: "https://example.com/chap3", isRead: true }),
      generateChapter({ link: "https://example.com/chap2", isRead: true }),
      generateChapter({ link: "https://example.com/chap1", isRead: true }),
    ],
    newChapCount: 0,
    unreadChapCount: 0,
  }),
];
