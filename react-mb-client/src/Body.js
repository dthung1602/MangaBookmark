import React from 'react';
import LoadMore from "./LoadMore";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "./Utils";
import {Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Row from "./Row";
import FloatButtons from "./FloatButtons";

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
                : ((m) => {
                    if (m._id === mangaID)
                        m.note = updatedValues.note;
                    return true;
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
                <div className={classes.header} id={'page-top'}>
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
                <FloatButtons onAddManga={this.onAddManga}/>
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
        a = a.chapters.filter(ch => !ch.isRead).length;
        b = b.chapters.filter(ch => !ch.isRead).length;
        return (a > b) ? -1 : ((a < b) ? 1 : 0);
    });
}

export default withStyles(styles)(Body);
