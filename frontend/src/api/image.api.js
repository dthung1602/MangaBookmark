import BaseAPI from "./base.api";

class MangaAPI extends BaseAPI {
  constructor() {
    super("image");
  }

  constructImageProxyURL(url, mangaSite) {
    const proxyURL = new URL(window.location.origin);
    proxyURL.pathname = this.basePath;
    proxyURL.searchParams.set("url", url);
    if (mangaSite) {
      proxyURL.searchParams.set("mangaSite", mangaSite);
    }
    return proxyURL.toString();
  }
}

export default new MangaAPI();
