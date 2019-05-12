function getMangaStatus(manga) {
    const allRead = manga.chapters.every(ch => ch.isRead);

    if (manga.isCompleted)
        if (allRead)
            return 'Finished';
        else
            return 'Many to read';

    else if (allRead)
        return 'Last chap reached';
    else
        return 'New chap';
}

const mangaStatuses = [
    'New chap', 'Many to read',
    'Last chap reached', 'Finished'
];

export default {getMangaStatus, mangaStatuses}