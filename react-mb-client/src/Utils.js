function getMangaStatus(manga) {
    const allRead = manga.chapters.every(ch => ch.isRead);

    if (manga.isCompleted)
        if (allRead)
            return 'Finished';
        else
            return 'To read';

    else if (allRead)
        return 'Last chap reached';
    else
        return 'New chap';
}

export default {getMangaStatus}