import React from 'react';
import MangaTable from "./MangaTable";
import LoadMore from "./LoadMore";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    header: {
        display: 'flex',
        paddingTop: 100
    },
    grow: {
        flexGrow: 1
    }
});

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortby: 'status',
        }
    }

    onSortByChange = (event) => {
        this.setState({
            sortby: event.target.value
        })
    };

    render() {
        const data = [
            {
                id: "5cd3cb713615403f7bdc0e9a",
                chapters: [
                    {
                        id: "5cd3cb713615403f7bdc0e9b",
                        isRead: false,
                        "name": "Chapter 5",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-5/465981",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9c",
                        isRead: false,
                        "name": "Chapter 4",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-4/465980",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9d",
                        isRead: false,
                        "name": "Chapter 3",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9e",
                        isRead: true,
                        "name": "Chapter 2",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9f",
                        isRead: true,
                        "name": "Chapter 1",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-1/465210",
                    }
                ],
                name: "The Shocking Reality Of A Loan Shark Collecting Money",
                link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
                image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",
            }
        ];

        const {classes} = this.props;
        const sortby = this.state.sortby;

        const sort = {
            'status': sortByStatus,
            'name': sortByName,
            'latest': sortByLatest,
            'many': sortByManyToRead
        }[sortby];
        sort(data);

        return (
            <div>
                <div className={classes.header}>
                    <SortBy sortby={sortby} onChange={this.onSortByChange}/>
                    <div className={classes.grow}/>
                    <SearchBar/>
                </div>
                <MangaTable
                    data={data}
                />
                <LoadMore/>
            </div>
        );
    }
}

function sortByStatus(mangas) {
    // TODO
}

function sortByName(mangas) {
    mangas.sort((a, b) => a.name > b.name);
}

function sortByLatest(mangas) {
    const latestChap = (manga) => {
        let latest = '2000-01-01';
        for (let i = 0; i < manga.chapters.length; i++) {
            if (manga.chapters[i].createAt > latest)
                latest = manga.chapters[i]
        }
        return latest;
    };

    mangas.sort((a, b) => latestChap(a) > latestChap(b));
}

function sortByManyToRead(mangas) {
    mangas.sort((a, b) => a.chapters.length > b.chapters.length);
}

export default withStyles(styles)(Body);
