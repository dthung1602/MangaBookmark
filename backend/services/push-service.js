const webpush = require("web-push");

const { Subscription, User } = require("../models");
const { getMangaUpdateResultCache } = require("../datasource");
const {
  updateMultiple: { QueueTypes },
} = require("./manga-service");
const { REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY, WEB_PUSH_CONTACT } = require("../config");

webpush.setVapidDetails(WEB_PUSH_CONTACT, REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY);

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
      console.log(`No updates for user "${user.id}"`);
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
          if (err.statusCode === 404 || err.statusCode === 410) {
            if (verbose) {
              console.log(`Subscription ${subscription._id} has expired or is no longer valid`);
            }
            subscription.delete();
          } else {
            console.error(err);
          }
        }),
    ),
  );

  if (verbose) {
    console.log(`Sent ${successCount}/${subscriptions.length} notifications to user "${user.id}"`);
  }
}

module.exports = {
  pushNotificationsToUser,
  pushAllMangaNotifications,
};
