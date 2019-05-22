import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Table, TableBody, TableHead, TableRow, Typography} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell/index";
import Row from "./Row";

const styles = () => ({
    table: {
        marginTop: 45,
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
    },
    blur: {
        filter: 'opacity(50%) blur(0.25px)'
    }
});

const dummy = [
    {
        _id: "0",
        chapters: [
            // {
            //     _id: "5cd3cb713615403f7bdc0e9d",
            //     isRead: false,
            //     createAt: '2020-05-16',
            //     "name": "Chapter 3B",
            //     "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            // },
            // {
            //     _id: "5cd3cb713615403f7bdc0e9e",
            //     isRead: false,
            //     createAt: '2015-05-16',
            //     "name": "Chapter 2B",
            //     "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            // },
            // {
            //     _id: "5cd3cb713615403f7bdc0e9f",
            //     isRead: false,
            //     createAt: '2014-05-16',
            //     "name": "Chapter 1B",
            //     "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-1/465210",
            // }
        ],
        following: 'following',
        isCompleted: false,
        note: 'This is a note',
        name: "AAA The Shocking Reality Of A Loan Shark Collecting Money",
        link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
        image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",
    },
    {
        _id: "1",
        chapters: [
            {
                _id: "5cd3cb713615403f7bdc0e9d",
                isRead: false,
                createAt: '2020-05-16',
                "name": "Chapter 3B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                _id: "5cd3cb713615403f7bdc0e9e",
                isRead: true,
                createAt: '2015-05-16',
                "name": "this is a chapter name with very long linesss",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            },
            {
                _id: "5cd3cb713615403f7bdc0e9f",
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
        _id: "2",
        chapters: [
            {
                _id: "5cd3cb713615403f7bdc0e9d",
                isRead: true,
                createAt: '2020-05-16',
                "name": "Chapter 3B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                _id: "5cd3cb713615403f7bdc0e9e",
                isRead: true,
                createAt: '2015-05-16',
                "name": "Chapter 2B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            },
            {
                _id: "5cd3cb713615403f7bdc0e9f",
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
        _id: "3",
        chapters: [
            {
                _id: "5cd3cb713615403f7bdc0e9d",
                isRead: true,
                createAt: '2020-05-16',
                "name": "Chapter 3B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
            },
            {
                _id: "5cd3cb713615403f7bdc0e9e",
                isRead: true,
                createAt: '2015-05-16',
                "name": "Chapter 2B",
                "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
            },
            {
                _id: "5cd3cb713615403f7bdc0e9f",
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

class MangaTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchData: [],
            searchData: [],
            loading: true
        }
    }

    componentDidMount() {
        if (this.props.isAuthorized)
            this.fetchManga()
                .catch(alert)
        // this.setState({fetchData: dummy})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.sortMethod !== prevProps.sortMethod) {
            const {fetchData, searchData} = this.state;
            this.props.sortMethod(fetchData);
            this.props.sortMethod(searchData);
            this.setState({fetchData: fetchData, searchData: searchData});
        }

        const {dataSource, isAuthorized} = this.props;
        if (isAuthorized) {
            if (dataSource !== prevProps.dataSource) {
                if (dataSource === 'fetch' && this.props.following !== prevProps.following)
                    this.fetchManga().catch(alert);
                if (dataSource === 'search' && this.props.searchTerm !== prevProps.searchTerm)
                    this.searchManga().catch(alert);
                return
            }

            if (this.props.following !== prevProps.following && dataSource === 'fetch') {
                this.fetchManga().catch(alert)
            }

            if (this.props.searchTerm !== prevProps.searchTerm && dataSource === 'search') {
                this.searchManga().catch(alert);
            }

            if (this.props.isAuthorized !== prevProps.isAuthorized) {
                if (dataSource === 'fetch')
                    this.fetchManga().catch(alert);
                if (dataSource === 'search')
                    this.searchManga().catch(alert);
            }
        }
    }

    fetchManga = async () => {
        const following = this.props.following;
        const url = '/api/manga?following=' + following;
        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin",
        };

        this.setState({loading: true});
        const response = await fetch(url, fetchOptions);

        if (response.ok) {
            const data = await response.json();
            this.props.sortMethod(data);
            this.setState({fetchData: data, loading: false});
            return;
        }

        throw await response.text();
    };

    searchManga = async () => {
        const searchTerm = encodeURIComponent(this.props.searchTerm.trim());
        if (searchTerm === '')
            return;

        const url = '/api/manga/search?term=' + searchTerm;
        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin",
        };

        this.setState({loading: true});
        const response = await fetch(url, fetchOptions);

        if (response.ok) {
            const data = await response.json();
            this.props.sortMethod(data);
            this.setState({searchData: data, loading: false});
            return;
        }

        throw await response.text();
    };

    onEditManga = async (mangaID, updatedValues) => {
        updatedValues.manga = mangaID;
        const url = `/api/manga/edit`;
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedValues)
        };
        const response = await fetch(url, fetchOptions);

        if (!response.ok)
            throw await response.text();

        let {fetchData} = this.state;

        // filter out fetched mangas that do not have matching following attribute
        if (updatedValues.hasOwnProperty('following'))
            fetchData = fetchData.filter((m) => (m._id !== mangaID || m.following === updatedValues.following));

        this.setState({fetchData: fetchData});
    };

    onDeleteManga = async (mangaID) => {
        try {
            const url = `/api/manga/delete`;
            const fetchOptions = {
                method: 'POST',
                credentials: "same-origin",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({manga: mangaID})
            };
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                const text = await response.text();
                alert("ERROR: " + text);
                return
            }

            const fetchData = this.state.fetchData.filter(m => m._id !== mangaID);
            const searchData = this.state.searchData.filter(m => m._id !== mangaID);
            this.setState({fetchData: fetchData, searchData: searchData});

        } catch (e) {
            alert("ERROR: Network error " + e);
        }
    };

    render() {
        const {classes, dataSource} = this.props;
        const {loading} = this.state;
        const data = (dataSource === 'fetch')
            ? this.state.fetchData
            : this.state.searchData;

        let tableClass = classes.table;

        let rows;
        if (loading)
            rows =
                <TableRow>
                    <TableCell colSpan={6}><Typography>Loading data ...</Typography></TableCell>
                </TableRow>;
        else if (data.length === 0)
            rows =
                <TableRow>
                    <TableCell colSpan={6}><Typography>Nothing to show</Typography></TableCell>
                </TableRow>;
        else
            rows = data.map(d =>
                <Row manga={d}
                     key={d._id}
                     onEditManga={this.onEditManga}
                     onDeleteManga={this.onDeleteManga}
                />
            );

        return (
            <Table className={tableClass}>
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
                    {rows}
                </TableBody>
            </Table>
        );
    }

}

export default withStyles(styles)(MangaTable);
