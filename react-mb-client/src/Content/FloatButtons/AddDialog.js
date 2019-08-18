import React from "react"

import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

import MangaPreviewInfo from "./MangaPreviewInfo"

const styles = () => ({});

const dummyAddData = {
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

};

class AddDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            link: '',
            mangaStatus: 'none', // none, waiting, ok, error
        }
    }

    onClickOpen = () => {
        this.setState({open: true});
    };

    onClose = () => {
        this.setState({open: false})
    };

    onChangeLink = async (event) => {
        const link = event.target.value.trim();

        // TODO
        // if (link !== '')
        //     this.setState({
        //         link: link,
        //         manga: dummyAddData,
        //         mangaStatus: 'ok'
        //     });
        // return;

        if (link !== '') {
            this.setState({
                link: link,
                mangaStatus: 'waiting',
                manga: 'Loading manga info ...'
            });

            const url = '/api/manga/info?link=' + encodeURIComponent(link);
            const fetchOptions = {
                method: 'GET',
                credentials: "same-origin",
            };
            try {
                const response = await fetch(url, fetchOptions);
                if (response.ok) {
                    const manga = await response.json();
                    // set default values
                    manga.following = 'following';
                    manga.chapters.forEach(chap => chap.isRead = false);
                    this.setState({
                        mangaStatus: 'ok',
                        manga: manga
                    });
                } else
                    this.setState({
                        mangaStatus: 'error',
                        manga: await response.text(),
                    });
            } catch (e) {
                this.setState({
                    mangaStatus: 'error',
                    manga: 'ERROR: ' + e
                });
            }
        } else {
            this.setState({
                link: link,
                mangaStatus: 'none'
            });
        }
    };

    onCompletedChange = (event) => {
        const {manga} = this.state;
        manga.isCompleted = event.target.checked;
        this.setState({manga: manga});
    };

    onFollowingChange = (event) => {
        const {manga} = this.state;
        manga.following = event.target.value;
        this.setState({manga: manga});
    };

    onChangeChapter = (event) => {
        const readChaptersLinks = event.target.value;
        const {manga} = this.state;
        const {chapters} = this.state.manga;
        chapters.forEach(chap => chap.isRead = readChaptersLinks.indexOf(chap.link) > -1);
        this.setState({manga: manga});
    };

    onMarkAllChaptersRead = () => {
        const {manga} = this.state;
        const {chapters} = this.state.manga;
        chapters.forEach(chap => chap.isRead = true);
        this.setState({manga: manga});
    };

    onChangeNote = (event) => {
        const {manga} = this.state;
        manga.note = event.target.value;
        this.setState({manga: manga});
    };

    addManga = async () => {
        const {manga} = this.state;

        try {
            this.setState({
                mangaStatus: 'waiting',
                manga: 'Adding manga ...'
            });
            await this.props.onAddManga(manga);
            this.setState({
                open: false,
                link: '',
                mangaStatus: 'none',
                manga: undefined
            });
        } catch (e) {
            alert("ERROR: " + e);
        }
    };

    render() {
        const {manga, mangaStatus, open, link} = this.state;

        let addButton = '';
        if (mangaStatus === 'ok')
            addButton =
                <DialogActions>
                    <Button variant={"contained"} color={"secondary"} onClick={this.addManga}>Add</Button>
                </DialogActions>;

        return (
            <div>
                <AddIcon onClick={this.onClickOpen}/>
                <Dialog
                    open={open}
                    onClose={this.onClose}
                    fullWidth
                    maxWidth='sm'
                    aria-labelledby="add-form-dialog-title"
                >
                    <DialogTitle id="add-form-dialog-title"> Add new manga </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label={"Manga link"}
                            onChange={this.onChangeLink}
                            value={link}/>
                        <MangaPreviewInfo
                            mangaStatus={mangaStatus}
                            manga={manga}
                            onFollowingChange={this.onFollowingChange}
                            onChangeChapter={this.onChangeChapter}
                            onChangeNote={this.onChangeNote}
                            onCompletedChange={this.onCompletedChange}
                            onMarkAllChaptersRead={this.onMarkAllChaptersRead}
                        />
                    </DialogContent>
                    {addButton}
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(AddDialog);
