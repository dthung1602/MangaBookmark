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

const mangaSourceRegex = {
    'Hoc vien truyen tranh': /^https?:\/\/hocvientruyentranh\.net\/truyen\/[0-9]+\/.*$/,
    'Mangakakalot': /^https?:\/\/mangakakalot\.com\/manga\/[a-z0-9]+$/,
    'Mangarock': /^https?:\/\/mangarock\.com\/manga\/mrs-serie-[0-9]+$/,
    'Nettruyen': /^https?:\/\/www\.nettruyen\.com\/truyen-tranh\/.+$/
};

function getMangaSource(link) {
    for (let src in mangaSourceRegex)
        if (link.match(mangaSourceRegex[src]))
            return src;
    return null;
}

export default {getMangaStatus, mangaStatuses, getMangaSource}