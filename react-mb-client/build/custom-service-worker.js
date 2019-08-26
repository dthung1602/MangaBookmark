const MAX_TITLE_LENGTH = 40;

function prepareNotificationBody(mangas) {
    let body = '';

    mangas.forEach(manga => {
        if (manga.name.length <= MAX_TITLE_LENGTH)
            body += manga.name;
        else
            body += manga.name.slice(0, MAX_TITLE_LENGTH + 1) + '...';
        body += `:    ${manga.newChapCount} new / ${manga.unreadChapCount} unread\n`;
    });

    return body;
}

function prepareNotificationTitle(mangas) {
    let totalChapCount = 0;
    mangas.forEach(manga => { totalChapCount += manga.newChapCount});

    let title = `${mangas.length} manga`;
    if (mangas.length > 1)
        title += 's have';
    else
        title += ' has';
    title += ` released ${totalChapCount} new chapter`;
    if (totalChapCount > 1)
        title += 's';
    return title;
}

self.addEventListener('push', event => {
    const mangas = event.data.json();
    console.log(mangas);
    const title = prepareNotificationTitle(mangas);
    const option = {
        body: prepareNotificationBody(mangas),
        requireInteraction: true,
        icon: '/favicon.ico',
        actions: [
            {
                action: '',
                title: 'Go to MangaBookmark'
            }
        ]
    };
    event.waitUntil(
        self.registration.showNotification(title, option)
    )
});


self.addEventListener('notificationclick', event => {
    const urlToOpen = new URL('/', self.location.origin).href;

    const promise = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(windowClients => {
        let matchingWindow = null;
        for (let i = 0; i < windowClients.length; i++) {
            const wc = windowClients[i];
            if (wc.url === urlToOpen) {
                matchingWindow = wc;
                break;
            }
        }
        if (matchingWindow)
            return matchingWindow.focus();
        return clients.openWindow(urlToOpen)
    });

    event.waitUntil(promise);
});



















