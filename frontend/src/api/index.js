import MangaAPI from "./manga.api";
import SubscriptionAPI from "./subscription.api";
import UserAPI from "./user.api";

export const APIServices = {
  manga: MangaAPI,
  subscription: SubscriptionAPI,
  user: UserAPI,
};

export const APIServiceFactory = {
  create: (name) => new APIServices[name](),
};
