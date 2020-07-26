function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

function detectOS() {
    const userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = "Unknown";

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'MacOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (os === 'Unknown' && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

function detectBrowser() {
    const browsers = ['MSIE', 'Opera', 'Chrome', 'Safari', 'Firefox'];
    for (let i = 0; i < browsers.length; i++) {
        if (window.navigator.userAgent.includes(browsers[i])) {
            if (i === 0) return "Internet Explorer";
            return browsers[i]
        }
    }
    return "Unknown";
}

const VAPID_KEY = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY);

function sendSubscription(subscription) {
    subscription = JSON.parse(JSON.stringify(subscription));
    const data = {
        'os': detectOS(),
        'browser': detectBrowser(),
        'endpoint': subscription.endpoint,
        'auth': subscription.keys.auth,
        'p256dh': subscription.keys.p256dh,
    };
    return fetch('/api/notification/subscribe', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(function (permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
            }
        });
}

export function subscribeUser() {
    if ('serviceWorker' in navigator) {
        // console.log(VAPID_KEY);
        // console.log(process.env.REACT_APP_VAPID_PUBLIC_KEY);
        navigator.serviceWorker.ready
            .then((registration) => {
                if (!registration.pushManager) {
                    console.log('Push manager unavailable.');
                    return
                }

                return registration.pushManager.getSubscription()
                    .then((existedSubscription) => {
                        if (existedSubscription === null) {
                            console.log('No subscription detected, make a request.');
                            registration.pushManager.subscribe({
                                applicationServerKey: VAPID_KEY,
                                userVisibleOnly: true,
                            }).then((newSubscription) => {
                                console.log('New subscription added.');
                                return sendSubscription(newSubscription)
                            }).catch((e) => {
                                if (Notification.permission !== 'granted') {
                                    console.log('Permission was not granted.')
                                } else {
                                    console.error('An error occurred during the subscription process.', e)
                                }
                            })
                        } else {
                            console.log('Existed subscription detected.');
                            // existedSubscription.unsubscribe().then(() => sub(registration));
                            return sendSubscription(existedSubscription)
                        }
                    })
            })
            .catch((e) => {
                console.error('An error occurred during Service Worker registration.', e)
            })
    }
}