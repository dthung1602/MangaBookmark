import React from 'react';
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "./Utils";
import {Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Row from "./Row";
import FloatButtons from "./FloatButtons";
import SelectFollowing from "./SelectFollowing";

const styles = () => ({
    body: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 110,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    table: {
        marginTop: 45
    },
    tableHeader: {
        background: '#00bea6',
        '&:hover': {
            background: '#00bea6'
        }
    },
    tableHeaderCell: {
        fontSize: '110%',
        fontWeight: 800,
        color: 'rgba(51,51,51,0.89)'
    }
});

const dummy = [
    {
        id: "0",
        chapters: [
            {
                id: "5cd3cb713615403f7bdc0e9d",
                isRead: false,
                createAt: '2020-05-16',
                "name": "Chapter 3B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                id: "5cd3cb713615403f7bdc0e9e",
                isRead: false,
                createAt: '2015-05-16',
                "name": "Chapter 2B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            },
            {
                id: "5cd3cb713615403f7bdc0e9f",
                isRead: false,
                createAt: '2014-05-16',
                "name": "Chapter 1B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-1/465210",
            }
        ],
        following: 'following',
        isCompleted: false,
        note: 'This is a note',
        name: "AAA The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",
    },
    {
        id: "1",
        chapters: [
            {
                id: "5cd3cb713615403f7bdc0e9d",
                isRead: false,
                createAt: '2020-05-16',
                "name": "Chapter 3B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                id: "5cd3cb713615403f7bdc0e9e",
                isRead: true,
                createAt: '2015-05-16',
                "name": "this is a chapter name with very long linesss",
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
        following: 'following',
        isCompleted: true,
        note: 'A looooooooooong long sdkfj sdlfjlskdj flksdjlkfjsdlkjf klsd fsadjfsd note sadf asdfs',
        name: "AAA The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",

    },
    {
        id: "2",
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
        following: 'following',
        isCompleted: false,
        note: '',
        name: "AAA The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",

    },
    {
        id: "3",
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
        following: 'following',
        isCompleted: true,
        note: '',
        name: "AAA The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",

    },
];

class Body extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sortby: 'status',
            following: 'following',
            data: dummy,
        };

        // this.fetchManga('following')
        //     .catch(alert)
    }

    fetchManga = async (following) => {
        const url = '/api/manga?following=' + following;
        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin",
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                data: data,
                following: following
            })
        }

        throw await response.text();
    };

    onChangeFollowing = async (event) => {
        // this.fetchManga(event.target.value)
        //     .catch(alert);
        this.setState({
            following: event.target.value,
            data: dummy
        })
    };

    onSortByChange = (event) => {
        this.setState({
            sortby: event.target.value
        })
    };

    onEditManga = async (mangaID, updatedValues) => {
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

        let data = this.state.data;
        if (updatedValues.hasOwnProperty('following'))
            data = data.filter((manga) => (manga._id !== mangaID || manga.following === updatedValues.following));
        this.setState({data: data});
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

    onAddManga = async (link) => {
        const url = '/api/manga/add';
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({link: link})
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const manga = await response.json();
            const data = this.state.data;
            data.push(manga);
            this.setState({data: data});
        } else
            throw await response.text();
    };

    render() {
        const data = this.state.data;
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
            <div className={classes.body}>
                <div className={classes.header} id={'page-top'}>
                    <SelectFollowing
                        following={this.state.following}
                        onChange={this.onChangeFollowing}
                    />
                    <SortBy
                        sortby={sortby}
                        onChange={this.onSortByChange}
                    />
                    <SearchBar/>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classes.tableHeaderCell}> Status </TableCell>
                            <TableCell className={classes.tableHeaderCell} colSpan={2}> Name </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Chapters </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Action </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Note </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(d => <Row manga={d} key={d._id}
                                            onEditManga={this.onEditManga}
                                            onDeleteManga={this.onDeleteManga}
                        />)}
                    </TableBody>
                </Table>
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
