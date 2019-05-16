import React from "react"

import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

import MangaPreviewInfo from "./MangaPreviewInfo"

const styles = () => ({});

class Add extends React.Component {

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
                if (response.ok)
                    this.setState({
                        mangaStatus: 'ok',
                        manga: await response.json()
                    });
                else
                    this.setState({
                        mangaStatus: 'error',
                        manga: await response.text(),
                    });
            } catch (e) {
                this.setState({
                    mangaStatus: 'error',
                    manga: 'ERROR: Network error ' + e
                });
            }
        } else {
            this.setState({
                link: link,
                mangaStatus: 'none'
            });
        }
    };

    addManga = async () => {
        const link = this.state.link;

        try {
            this.setState({
                mangaStatus: 'waiting',
                manga: 'Adding manga ...'
            });
            await this.props.onAddManga(link);
            this.setState({
                open: false,
                link: '',
                mangaStatus: 'none'
            });
        } catch (e) {
            alert("ERROR: " + e);
        }
    };

    render() {
        let addButton = '';
        if (this.state.mangaStatus === 'ok')
            addButton =
                <DialogActions>
                    <Button variant={"raised"} color={"secondary"} onClick={this.addManga}>Add</Button>
                </DialogActions>;

        return (
            <div>
                <AddIcon onClick={this.onClickOpen}/>
                <Dialog
                    open={this.state.open}
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
                            value={this.state.link}/>
                        <MangaPreviewInfo
                            mangaStatus={this.state.mangaStatus}
                            data={this.state.manga}
                        />
                    </DialogContent>
                    {addButton}
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(Add);
