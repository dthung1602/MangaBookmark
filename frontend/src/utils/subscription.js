import { message } from "antd";

import { SubscriptionAPI } from "../api";
import { SERVER_VAPID_KEY } from "./constants";
import { checkResponse } from "./error-handler";
import { getCookie } from "./index";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function detectOS() {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = "Unknown";

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "MacOS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (os === "Unknown" && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

function detectBrowser() {
  const browsers = ["MSIE", "Opera", "Chrome", "Safari", "Firefox"];
  for (let i = 0; i < browsers.length; i++) {
    if (window.navigator.userAgent.includes(browsers[i])) {
      if (i === 0) {
        return "Internet Explorer";
      }
      return browsers[i];
    }
  }
  return "Unknown";
}

async function shouldSubscribe(user) {
  if (!user) {
    return false;
  }

  // already asked for permission by denied
  if (getCookie("deniedPushNotification") === "true") {
    return false;
  }

  // browser does not support service workers
  if (!("serviceWorker" in navigator)) {
    return false;
  }

  const registration = await navigator.serviceWorker.ready;

  // Push manager unavailable
  if (!registration.pushManager) {
    return false;
  }

  // Already subscribed
  const existedSubscription = await registration.pushManager.getSubscription();
  return !existedSubscription;
}

async function subscribeUser() {
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.subscribe({
    applicationServerKey: urlBase64ToUint8Array(SERVER_VAPID_KEY),
    userVisibleOnly: true,
  });

  subscription = JSON.parse(JSON.stringify(subscription));
  const params = {
    os: detectOS(),
    browser: detectBrowser(),
    endpoint: subscription.endpoint,
    auth: subscription.keys.auth,
    p256dh: subscription.keys.p256dh,
  };

  const response = await SubscriptionAPI.post(params);
  checkResponse(response);
  return await response.json();
}

function askPermissionThenSubscribe() {
  return Notification.requestPermission()
    .then((result) => {
      if (result !== "granted") {
        throw Error("We weren't granted permission.");
      }
      return subscribeUser();
    })
    .catch((e) => message.error(e.message));
}

export { shouldSubscribe, subscribeUser, askPermissionThenSubscribe };
