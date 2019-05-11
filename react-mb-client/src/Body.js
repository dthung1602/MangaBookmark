import React from 'react';
import LoadMore from "./LoadMore";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "./Utils";
import {Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Row from "./Row";

const styles = theme => ({
    header: {
        display: 'flex',
        paddingTop: 100
    },
    grow: {
        flexGrow: 1
    }
});

const dummy = [
    {
        id: "5cd3cb713615",
        chapters: [
            {
                id: "5cd3cb713615403f7bdc0e9d",
                isRead: true,
                createAt: '2020-05-16',
                "name": "Chapter 3B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                id: "5cd3cb713615403f7bdc0e9e",
                isRead: true,
                createAt: '2015-05-16',
                "name": "Chapter 2B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            },
            {
                id: "5cd3cb713615403f7bdc0e9f",
                isRead: true,
                createAt: '2014-05-16',
                "name": "Chapter 1B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-1/465210",
            }
        ],
        name: "BBB The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",
    },
    {
        id: "403f7bdc0e9a",
        chapters: [
            {
                id: "5cd3cb713615403f7bdc0e9b",
                isRead: false,
                createAt: '2019-05-20',
                "name": "Chapter 5A",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-5/465981",
            },
            {
                id: "5cd3cb713615403f7bdc0e9c",
                isRead: false,
                createAt: '2019-05-20',
                "name": "Chapter 4A",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-4/465980",
            },
            {
                id: "5cd3cb713615403f7bdc0e9d",
                isRead: false,
                createAt: '2019-04-18',
                "name": "Chapter 3A",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                id: "5cd3cb713615403f7bdc0e9e",
                isRead: true,
                createAt: '2019-04-17',
                "name": "Chapter 2A",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            },
            {
                id: "5cd3cb713615403f7bdc0e9f",
                isRead: true,
                createAt: '2018-05-16',
                "name": "Chapter 1A",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-1/465210",
            }
        ],
        name: "AAA The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",
    }
];

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.fetchMangas();

        this.state = {
            sortby: 'status',
            data: [],
        }
    }

    fetchMangas = async () => {
        try {
            const url = '/api/manga';
            const fetchOptions = {
                method: 'GET',
                credentials: "same-origin"
            };
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                alert('ERROR: Failed to load mangas.');
                return;
            }
            this.setState({
                data: await response.json()
            })
        } catch (e) {
            alert('ERROR: ' + e)
        }
    };

    onSortByChange = (event) => {
        this.setState({
            sortby: event.target.value
        })
    };

    onEditManga = async (mangaID, updatedValues) => {
        try {
            const url = `/api/manga/edit/${mangaID}`;
            const fetchOptions = {
                method: 'POST',
                credentials: "same-origin",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedValues)
            };
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                const text = await response.text();
                alert("ERROR: " + text);
                return
            }

            // change note => no need to change
            // drop + delete => remove manga
            const filter = (updatedValues.note === undefined)
                ? (m => m._id !== mangaID)
                : (m => {
                    m.note = updatedValues.note;
                    return true
                });
            const mangas = this.state.data.filter(filter);

            this.setState({data: mangas});

        } catch (e) {
            alert("ERROR: Cannot load data. Check your Internet connection.");
        }
    };

    onDeleteManga = async (mangaID) => {
        try {
            const url = `/api/manga/delete/${mangaID}`;
            const fetchOptions = {
                method: 'POST',
                credentials: "same-origin"
            };
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                const text = await response.text();
                alert("ERROR: " + text);
                return
            }

            const mangas = this.state.data.filter(m => m._id !== mangaID);

            this.setState({data: mangas});

        } catch (e) {
            alert("ERROR: Cannot load data. Check your Internet connection.");
        }
    };

    render() {
        const data = this.state.data;
        const {classes} = this.props;
        const sortby = this.state.sortby;
        const onEditManga = this.onEditManga;
        const onDeleteManga = this.onDeleteManga;

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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Status </TableCell>
                            <TableCell> Name </TableCell>
                            <TableCell> Last read chapter </TableCell>
                            <TableCell> Latest chapter </TableCell>
                            <TableCell> Note </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(d => <Row manga={d} key={d._id}
                                            onEditManga={onEditManga}
                                            onDeleteManga={onDeleteManga}
                        />)}
                    </TableBody>
                </Table>
                <LoadMore/>
            </div>
        );
    }
}

function sortByStatus(mangas) {
    mangas.sort((a, b) => {
        const statuses = ['New Chap', 'Last chap reached', 'To read', 'Finished'];
        a = statuses.indexOf(Utils.getMangaStatus(a));
        b = statuses.indexOf(Utils.getMangaStatus(b));
        return (a > b) ? 1 : ((a < b) ? -1 : 0);
    });
}

function sortByName(mangas) {
    mangas.sort((a, b) => (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0));
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
        a = a.chapters.length;
        b = b.chapters.length;
        return (a > b) ? 1 : ((a < b) ? -1 : 0);
    });
}

export default withStyles(styles)(Body);
