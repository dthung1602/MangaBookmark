import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";

import FloatButtons from "./FloatButtons";
import Header from "./Header";
import MangaTable from "./MangaTable";
import utils from "../utils";

const styles = () => ({
    content: {
        paddingLeft: 24,
        paddingRight: 24
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

class Content extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sortby: 'status',
            dataSource: 'fetch', // fetch or search
            following: 'following',
            searchTerm: '',
            updatingMangas: false,
            newManga: null,
            mangaTableKey: new Date()
        };
    }

    onSortByChange = (event) => {
        this.setState({
            sortby: event.target.value
        })
    };

    onFollowingChange = (event) => {
        this.setState({
            dataSource: 'fetch',
            following: event.target.value
        });
    };

    onSearch = (searchTerm) => {
        this.setState({
            dataSource: 'search',
            searchTerm: searchTerm,
        })
    };

    closeSearchResult = () => {
        this.setState({
            dataSource: 'fetch',
            searchTerm: ''
        })
    };

    onAddManga = async (manga) => {
        const url = '/api/manga/add';
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(manga)
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok)
            throw await response.text();

        this.setState({
            dataSource: 'fetch',
            following: manga.following,
            newManga: await response.json()
        });
    };

    onUpdateManga = async () => {
        this.setState({updatingMangas: true});

        const {following} = this.state;

        const url = '/api/manga/update-multiple';
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({following: following})
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            this.setState({updatingMangas: false});
            alert('ERROR ' + await response.text());
            return
        }

        const result = await response.json();
        let text = `Update successfully ${result.success.length}/${result.total} mangas:`;
        result.success.forEach(mangaName => text += `\n-  ${mangaName}`);
        alert(text);

        this.setState({
            updatingMangas: false,
            dataSource: 'fetch',
            following: following,
            mangaTableKey: new Date() // force re-generate
        });
    };

    render() {
        const {classes, isAuthorized} = this.props;
        const {following, sortby, dataSource, searchTerm, mangaTableKey, newManga, updatingMangas} = this.state;

        const sortMethod = {
            'status': sortByStatus,
            'name': sortByName,
            'latest': sortByLatest,
            'many': sortByManyToRead
        }[sortby];

        return (
            <div className={classes.content}>
                <Header
                    dataSource={dataSource}
                    following={following}
                    onFollowingChange={this.onFollowingChange}
                    sortby={sortby}
                    onSortByChange={this.onSortByChange}
                    onSearch={this.onSearch}
                    closeSearchResult={this.closeSearchResult}
                />
                <MangaTable
                    key={mangaTableKey}
                    newManga={newManga}
                    sortMethod={sortMethod}
                    following={following}
                    searchTerm={searchTerm}
                    dataSource={dataSource}
                    isAuthorized={isAuthorized}
                />
                <FloatButtons
                    onAddManga={this.onAddManga}
                    onUpdateManga={this.onUpdateManga}
                    updatingMangas={updatingMangas}
                    following={following}
                />
            </div>
        );
    }

}

function sortByStatus(mangas) {
    mangas.sort((a, b) => {
        a = utils.mangaStatuses.indexOf(utils.getMangaStatus(a));
        b = utils.mangaStatuses.indexOf(utils.getMangaStatus(b));
        return (a > b) ? 1 : ((a < b) ? -1 : 0);
    });
}

function sortByName(mangas) {
    mangas.sort((a, b) => {
        a = utils.removeDiacritics(a.name.toLowerCase().trim());
        b = utils.removeDiacritics(b.name.toLowerCase().trim());
        return (a > b) ? 1 : ((a < b) ? -1 : 0)
    });
}

function sortByLatest(mangas) {
    const latestChap = (manga) => {
        let latest = new Date('2000-01-01');
        for (let i = 0; i < manga.chapters.length; i++) {
            const date = new Date(manga.chapters[i].createAt);
            if (date > latest)
                latest = date;
        }
        return latest;
    };

    mangas.sort((a, b) => {
        a = latestChap(a);
        b = latestChap(b);
        return (a > b) ? -1 : ((a < b) ? 1 : 0);
    });
}

function sortByManyToRead(mangas) {
    mangas.sort((a, b) => {
        a = a.chapters.filter(ch => !ch.isRead).length;
        b = b.chapters.filter(ch => !ch.isRead).length;
        return (a > b) ? -1 : ((a < b) ? 1 : 0);
    });
}

export default withStyles(styles)(Content);
