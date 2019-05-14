import React from 'react';
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "./Utils";
import FloatButtons from "./FloatButtons";
import SelectFollowing from "./SelectFollowing";
import MangaTable from "./MangaTable";

const styles = () => ({
    body: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 110,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

class Body extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sortby: 'status',
            following: 'following'
        };
    }

    onFollowingChange = (event) => {
        this.setState({
            following: event.target.value
        });
    };

    onSortByChange = (event) => {
        this.setState({
            sortby: event.target.value
        })
    };

    onAddManga = async (link) => {
        const url = '/api/manga/add';
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({link: link})
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok)
            this.setState({following: 'following'});
        else
            throw await response.text();
    };

    render() {
        const {classes} = this.props;
        const sortMethod = {
            'status': sortByStatus,
            'name': sortByName,
            'latest': sortByLatest,
            'many': sortByManyToRead
        }[this.state.sortby];

        return (
            <div className={classes.body}>
                <div className={classes.header} id={'page-top'}>
                    <SelectFollowing
                        following={this.state.following}
                        onChange={this.onFollowingChange}
                    />
                    <SortBy
                        sortby={this.state.sortby}
                        onChange={this.onSortByChange}
                    />
                    <SearchBar/>
                </div>
                <MangaTable
                    sortMethod={sortMethod}
                    following={this.state.following}
                    key={new Date()} /* re-generate manga table every time state.sortby or state.following changes
                                        https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key*/
                />
                <FloatButtons onAddManga={this.onAddManga}/>
            </div>
        );
    }

}

function sortByStatus(mangas) {
    mangas.sort((a, b) => {
        a = Utils.mangaStatuses.indexOf(Utils.getMangaStatus(a));
        b = Utils.mangaStatuses.indexOf(Utils.getMangaStatus(b));
        return (a > b) ? 1 : ((a < b) ? -1 : 0);
    });
}

function sortByName(mangas) {
    mangas.sort((a, b) => {
        a = a.name.toLowerCase().trim();
        b = b.name.toLowerCase().trim();
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

export default withStyles(styles)(Body);
