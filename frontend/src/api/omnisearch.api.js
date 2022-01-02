import BaseAPI from "./base.api";

const formatFakeResult = (object, timeout = 2000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(new Response(new Blob([JSON.stringify(object)]))), timeout);
  });

class OmniSearchAPI extends BaseAPI {
  constructor() {
    super("omnisearch");
  }

  searchUserData(term) {
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
      link: "http://localhost:3001/manga-detail?id=60366250890c37002dec23e4",
      attributes: {},
    },
    {
      _id: "613223fd194c2f002d73c797",
      type: "user-manga",
      name: "MOMO: THE BLOOD TAKER",
      image: "https://img.blogtruyen.vn/manga/20/20635/momo-the-blood-taker.jpg",
      link: "http://localhost:3001/manga-detail?id=613223fd194c2f002d73c797",
      attributes: {},
    },
    {
      _id: "61bc9c5d3901e71b34b6ce1e",
      type: "user-manga",
      name: "Mushoku Tensei ~Isekai Ittara Honki Dasu~",
      image:
        "https://uploads.mangadex.org/covers/bd6d0982-0091-4945-ad70-c028ed3c0917/92580bc5-2608-4055-b99b-b8cc150b5bbd.jpg",
      link: "http://localhost:3001/manga-detail?id=61bc9c5d3901e71b34b6ce1e",
      attributes: {},
    },
  ],
};

const scanlationSitesData = {
  data: [],
};

const malData = {
  data: [],
};

export default new OmniSearchAPI();
