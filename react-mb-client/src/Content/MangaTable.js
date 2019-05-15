import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Table, TableBody, TableHead, TableRow, Typography} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell/index";
import Row from "./Row";

const styles = () => ({
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
        this.state = {data: []}
    }

    componentDidMount() {
        this.fetchManga(this.props.following)
            .catch(alert)
        // this.setState({data: dummy})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.following !== prevProps.following) {
            this.fetchManga(this.props.following)
                .catch(alert)
        }
        if (this.props.sort !== prevProps.following) {
            const data = this.state.data;
            this.props.sortMethod(data);
            this.setState({data: data});
        }
    }

    fetchManga = async () => {
        const following = this.props.following;
        const url = '/api/manga?following=' + following;
        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin",
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const data = await response.json();
            this.props.sortMethod(data);
            this.setState({data: data});
            return;
        }

        throw await response.text();
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

        if (!response.ok)
            throw await response.text();

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

            const data = this.state.data.filter(m => m._id !== mangaID);
            this.setState({data: data});

        } catch (e) {
            alert("ERROR: Network error " + e);
        }
    };

    render() {
        const {classes} = this.props;
        const data = this.state.data;

        let rows =
            <TableRow>
                <TableCell colSpan={6}><Typography>Nothing to show</Typography></TableCell>
            </TableRow>;

        if (data.length > 0)
            rows = data.map(d =>
                <Row manga={d}
                     key={d._id}
                     onEditManga={this.onEditManga}
                     onDeleteManga={this.onDeleteManga}
                />
            );

        return (
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
                    {rows}
                </TableBody>
            </Table>
        );
    }

}

export default withStyles(styles)(MangaTable);
