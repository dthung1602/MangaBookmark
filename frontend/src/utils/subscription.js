import { message } from "antd";
import { detect } from "detect-browser";

import { SubscriptionAPI } from "../api";
import { SERVER_VAPID_KEY, BROWSERS, OS, UNKNOWN_BROWSER, UNKNOWN_OS } from "./constants";
import { throwOnCriticalErrors } from "./error-handler";
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
  const browser = detect();
  console.log(browser);
  if (browser) {
    for (let os of OS) {
      if (browser.os.toLowerCase().includes(os.toLowerCase())) {
        return os;
      }
    }
  }

  return UNKNOWN_OS;
}

function detectBrowser() {
  const browser = detect();
  console.log(browser);
  if (browser) {
    for (let br of BROWSERS) {
      if (browser.name.toLowerCase().includes(br.toLowerCase())) {
        return br;
      }
    }
  }

  return UNKNOWN_BROWSER;
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

  const response = await SubscriptionAPI.post(params).result;
  throwOnCriticalErrors(response);
  return response.json();
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
