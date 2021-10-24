const { ObjectId } = require("mongoose").Types;
const { createNGrams } = require("mongoose-fuzzy-searching/helpers");

const [user1, user2, user3] = require("./users").map((u) => u["_id"]);
const { Shelf } = require("../../models/Manga");
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
    num = faker.datatype.number() % 10;
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
  const data = {
    _id: new ObjectId(),
    isCompleted: false,
    shelf: Shelf.READING,
    note: "",
    name: mangaName(),
    link: faker.internet.url(),
    image: faker.image.image(),
    chapters: chapters,
    user: user1,
    hidden: false,
    site: faker.lorem.word(),
    status: faker.datatype.number() % 4,
    newChapCount: 0,
    unreadChapCount: chapters.length,
    description: "",
    lang: "en",
    alternativeNames: [faker.lorem.words(), faker.lorem.words()],
    authors: [faker.name.findName()],
    tags: [faker.random.word(), faker.random.word(), faker.random.words()],
    __v: 1,
    ...getTimeStamp(),
    ...override,
  };
  createNGrams(data, ["name", "alternativeNames", "authors"]);
  return data;
}

module.exports = [
  generateManga({
    _id: new ObjectId("111eeeeeeeeeeeeeeeeee111"),
    link: "https://manga1.com",
    name: "Hello world",
    shelf: Shelf.READING,
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
    tags: ["tag1", "tag2", "tag3"],
    site: "src1",
    newChapCount: 2,
    unreadChapCount: 3,
    createdAt: new Date("2011-11-11T11:11:11.112Z"),
    updatedAt: new Date("2012-12-12T12:12:12.122Z"),
  }),
  generateManga({
    _id: new ObjectId("222eeeeeeeeeeeeeeeeee222"),
    user: user2,
    shelf: Shelf.READING,
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
    shelf: Shelf.READING,
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
    shelf: Shelf.TO_READ,
    status: 1,
    hidden: true,
    isCompleted: false,
    chapters: [
      generateChapter({ link: "https://example.com/chap3", isRead: true }),
      generateChapter({ link: "https://example.com/chap2", isRead: true }),
      generateChapter({ link: "https://example.com/chap1", isRead: true }),
    ],
    tags: ["tag1"],
    site: "src1",
    newChapCount: 0,
    unreadChapCount: 0,
    createdAt: new Date("2012-12-12T12:12:12.122Z"),
    updatedAt: new Date("2013-12-13T13:13:13.113Z"),
  }),
  generateManga({
    _id: new ObjectId("555eeeeeeeeeeeeeeeeee555"),
    name: "get Married When You Grow Up!",
    link: "https://manga5.com",
    shelf: Shelf.TO_READ,
    status: 0,
    isCompleted: true,
    chapters: [
      generateChapter({ link: "https://example.com/chap3", isRead: true }),
      generateChapter({ link: "https://example.com/chap2", isRead: true }),
      generateChapter({ link: "https://example.com/chap1", isRead: true }),
    ],
    tags: [],
    site: "src2",
    newChapCount: 0,
    unreadChapCount: 0,
    createdAt: new Date("2013-12-13T13:13:13.113Z"),
    updatedAt: new Date("2014-12-14T14:14:14.114Z"),
  }),
];
