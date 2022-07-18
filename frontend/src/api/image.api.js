import BaseAPI from "./base.api";

class ImageAPI extends BaseAPI {
  constructor() {
    super("image");
  }

  constructImageProxyURL(url, mangaSite) {
    const proxyURL = new URL(window.location.origin);
    proxyURL.pathname = this.basePath + "/proxy";
    proxyURL.searchParams.set("url", url);
    if (mangaSite) {
      proxyURL.searchParams.set("mangaSite", mangaSite);
    }
    return proxyURL.toString();
  }
}

export default new ImageAPI();
