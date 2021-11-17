const webpush = require("web-push");

const { Subscription, User } = require("../models");
const { getMangaUpdateResultCache } = require("../datasource");
const { getLogger, WEBPUSH_FINISHED, WEBPUSH_NO_UPDATE, WEBPUSH_FAILED } = require("./log-service");
const {
  updateMultiple: { QueueTypes },
} = require("./manga-service");
const { REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY, WEB_PUSH_CONTACT } = require("../config");

webpush.setVapidDetails(WEB_PUSH_CONTACT, REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY);

const logger = getLogger("web-push-service");

async function pushAllMangaNotifications(verbose = false) {
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

async function pushNotificationsToUser(user, summaries, verbose = false) {
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
        .catch((err) => {
          if (verbose) {
            logger.error(WEBPUSH_FAILED, {
              error: "" + err,
              statusCode: err.statusCode,
            });
          }
          if (err.statusCode === 404 || err.statusCode === 410) {
            subscription.delete();
          }
        }),
    ),
  );

  if (verbose) {
    logger.log(WEBPUSH_FINISHED, { user: user.id, success: successCount, total: subscriptions.length });
  }
}

module.exports = {
  pushNotificationsToUser,
  pushAllMangaNotifications,
};
