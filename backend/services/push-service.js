import webpush from "web-push";

import { Subscription, User } from "../models/index.js";
import { getMangaUpdateResultCache } from "../datasource/index.js";
import { getLogger, WEBPUSH_FINISHED, WEBPUSH_NO_UPDATE, WEBPUSH_FAILED } from "./log-service.js";
import { updateMultiple } from "./manga-service/index.js";
import { REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY, WEB_PUSH_CONTACT } from "../config.js";

webpush.setVapidDetails(WEB_PUSH_CONTACT, REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY);

const { QueueTypes } = updateMultiple;
const logger = getLogger("web-push-service");

export async function pushAllMangaNotifications(verbose = false) {
  const resultCache = getMangaUpdateResultCache(QueueTypes.SCHEDULED);

  const promises = [];

  for await (const user of User.find()) {
    promises.push(
      resultCache.retrieveAll(user.id).then((summaries) => {
        pushNotificationsToUser(user, summaries, verbose);
      }),
    );
  }

  await Promise.allSettled(promises);
}

export async function pushNotificationsToUser(user, summaries, verbose = false) {
  summaries = summaries.filter((summary) => summary.status === "success" && summary.data.newChapCount > 0);

  if (summaries.length === 0) {
    if (verbose) {
      logger.log(WEBPUSH_NO_UPDATE, { user: user.id });
    }
    return;
  }

  const data = JSON.stringify(summaries);
  const subscriptions = await Subscription.find({ user: user.id });

  let successCount = 0;
  await Promise.all(
    subscriptions.map((subscription) =>
      webpush
        .sendNotification(subscription.toStdFormat(), data)
        .then(() => {
          successCount += 1;
        })
        .catch(async (err) => {
          if (verbose) {
            logger.error(WEBPUSH_FAILED, {
              error: "" + err,
              statusCode: err.statusCode,
            });
          }
          if (err.statusCode === 404 || err.statusCode === 410) {
            await subscription.delete();
          }
        }),
    ),
  );

  if (verbose) {
    logger.log(WEBPUSH_FINISHED, { user: user.id, success: successCount, total: subscriptions.length });
  }
}

export default {
  pushNotificationsToUser,
  pushAllMangaNotifications,
};
