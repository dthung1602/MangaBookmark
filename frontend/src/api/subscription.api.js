import BaseAPI from "./base.api";

class SubscriptionAPI extends BaseAPI {
  constructor() {
    super("subscriptions");
  }
}

export default new SubscriptionAPI();
