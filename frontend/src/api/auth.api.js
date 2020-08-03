import BaseAPI from "./base.api";

class AuthAPI extends BaseAPI {
  constructor() {
    super("auth");
  }

  login(params) {
    return this.post(params, "login");
  }

  logout() {
    return this.post(undefined, "logout");
  }
}

export default new AuthAPI();
