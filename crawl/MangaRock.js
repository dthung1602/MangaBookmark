const rq = require('request-promise');

const URLRegex = /^https?:\/\/mangarock\.com\/manga\/mrs-serie-[0-9]+$/;

async function loadData(url) {
    const mangaID = url.slice(28);
    const requestOptions = {
        method: 'POST',
        uri: 'https://api.mangarockhd.com/query/web401/manga_detail',
        body: {
            "oids": {[mangaID]: 0},
            "sections": ["basic_info", "summary", "sub_genres", "author", "chapters", "feature_collections"]
        },
        json: true
    };
    const result = await rq(requestOptions);
    return {
        mangaID: mangaID,
        data: result.data[mangaID]
    }
}

function normalizeDataSource(dataSource) {
    return (typeof dataSource === 'string' && dataSource.trim().startsWith('http'))
        ? loadData(dataSource)
        : dataSource
}

async function parseChapters(dataSource) {
    const {mangaID, data} = await normalizeDataSource(dataSource);

    return data.chapters.chapters.map(chap => ({
        name: chap.name,
        link: `https://mangarock.com/manga/${mangaID}/chapter/${chap.oid}`
    }))
}

async function parseManga(dataSource) {
    const {mangaID, data} = await normalizeDataSource(dataSource);

    return {
        name: data.basic_info.name,
        link: 'https://mangarock.com/manga/' + mangaID,
        image: data.basic_info.thumbnail,
        isCompleted: data.basic_info.completed,
        chapters: await parseChapters({mangaID, data})
    }
}

let x = {
    "code": 0,
    "data": {
        "mrs-serie-200038009": {
            "feature_collections": null,
            "chapters": {
                "chapters": [{
                    "cid": 29297782,
                    "oid": "mrs-chapter-200038667",
                    "name": "Chapter 0",
                    "last_updated": 1557678833,
                    "order": 0
                }, {
                    "cid": 29316644,
                    "oid": "mrs-chapter-200041854",
                    "name": "Chapter 1",
                    "last_updated": 1558147591,
                    "order": 1
                }]
            },
            "basic_info": {
                "name": "Hyperventilation",
                "thumbnail": "https://f01.mrcdn.info/file/mrportal/j/5/c/g/sq.6tf2SvFU.jpg",
                "thumbnail_extra": {
                    "generated": false,
                    "averageColor": "#9097AA",
                    "textBackgroundColor": "#BCC5DC",
                    "textColor": "#000000"
                },
                "cover": "https://f01.mrcdn.info/file/mrportal/j/5/c/g/rv.bKw1tpQp.png",
                "alias": ["과호흡"],
                "cover_extra": {
                    "generated": false,
                    "averageColor": "#516370",
                    "textBackgroundColor": "#404E59",
                    "textColor": "#FFFFFF"
                },
                "rank": 3457,
                "removed": false,
                "author": "Bboong Bbang Kkyu",
                "completed": false,
                "direction": 0,
                "categories": [4, 7, 15, 16, 29],
                "total_chapters": 2,
                "description": "Meeting the unrequited love of your 18-year-old self during a class reunion at 27 — that love that has missed its chance to bear fruit... where is it headed until now?",
                "release_frequency": {},
                "mrs_series": null
            },
            "summary": {"plot_points": [], "key_genres": ["mrs-genre-358372", "mrs-genre-358150", "mrs-genre-304202"]},
            "sub_genres": {"sub_genres": ["mrs-genre-304073", "mrs-genre-304177", "mrs-genre-304202", "mrs-genre-358150", "mrs-genre-358372"]},
            "author": {
                "authors": [{"oid": "mrs-author-200038669", "role": "art"}, {
                    "oid": "mrs-author-200038669",
                    "role": "story"
                }]
            },
            "default": {"oid": "mrs-serie-200038009", "mid": 664920, "msid": 71, "last_updated": 1558147591}
        }
    }
};

module.exports = {
    URLRegex,
    loadData,
    parseManga,
    parseChapters
};