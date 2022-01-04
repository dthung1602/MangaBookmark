import BaseAPI from "./base.api";

const formatFakeResult = (object, timeout = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(new Response(new Blob([JSON.stringify(object)]))), timeout);
  });

class OmniSearchAPI extends BaseAPI {
  constructor() {
    super("omnisearch");
  }

  searchUserManga(term) {
    return {
      result: formatFakeResult(userData),
      abort: () => {},
    };
  }

  searchScanlationSites(term) {
    return {
      result: formatFakeResult(scanlationSitesData),
      abort: () => {},
    };
  }

  searchMAL(term) {
    return {
      result: formatFakeResult(malData),
      abort: () => {},
    };
  }
}

const userData = {
  data: [
    {
      _id: "60366250890c37002dec23e4",
      type: "user-manga",
      name: "Ayakashi Triangle",
      image:
        "http://fmcdn.mfcdn.net/store/manga/34383/cover.jpg?token=d81495829ddf3d904fc972c6c242639ad4d14fd0&ttl=1641042000&v=1639953724",
      attributes: {
        status: 1,
        shelf: "reading",
        site: "Mangakakalot",
        isCompleted: true,
        authors: ["abc xyz"],
        lastReleased: "2021-12-14T00:00:12.213Z",
        latestChapter: {
          name: "Ayakashi Triangle Ch.073",
          link: "http://fanfox.net/manga/ayakashi_triangle/c073/1.html",
        },
      },
    },
    {
      _id: "613223fd194c2f002d73c797",
      type: "user-manga",
      name: "MOMO: THE BLOOD TAKER",
      image: "https://img.blogtruyen.vn/manga/20/20635/momo-the-blood-taker.jpg",
      attributes: {
        status: 2,
        shelf: "reading",
        site: "MangaDex",
        isCompleted: false,
        authors: ["abc xyz", "kjw NSu"],
        lastReleased: "2021-12-02T00:00:12.213Z",
        latestChapter: {
          name: "Chapter 23",
          link: "http://fanfox.net/manga/ayakashi_triangle/c073/1.html",
        },
      },
    },
    {
      _id: "61bc9c5d3901e71b34b6ce1e",
      type: "user-manga",
      name: "Mushoku Tensei ~Isekai Ittara Honki Dasu~",
      image:
        "https://uploads.mangadex.org/covers/bd6d0982-0091-4945-ad70-c028ed3c0917/92580bc5-2608-4055-b99b-b8cc150b5bbd.jpg",
      attributes: {
        status: 3,
        shelf: "dropped",
        site: "Mangakakalot",
        isCompleted: false,
        authors: ["abc xyz"],
        lastReleased: "2021-12-12T00:00:12.213Z",
        latestChapter: {
          name: "Chap 77 A New Morning",
          link: "https://mangadex.org/chapter/bae16d28-b678-43b3-b398-5a1a9902ca65/1",
        },
      },
    },
  ],
};

const scanlationSitesData = {
  data: [
    {
      _id: "sdfsdf60366250890c37002dec23e4",
      type: "scanlation-manga",
      name: "Ayakashi Triangle",
      image:
        "http://fmcdn.mfcdn.net/store/manga/34383/cover.jpg?token=d81495829ddf3d904fc972c6c242639ad4d14fd0&ttl=1641042000&v=1639953724",
      attributes: {
        site: "Mangakakalot",
        isCompleted: true,
        authors: ["abc xyz"],
        totalChapters: 83,
        lastReleased: "2021-12-12T00:00:12.213Z",
        latestChapter: {
          name: "Chap 77 A New Morning",
          link: "https://mangadex.org/chapter/bae16d28-b678-43b3-b398-5a1a9902ca65/1",
        },
      },
    },
  ],
};

const malData = {
  data: [],
};

export default new OmniSearchAPI();
