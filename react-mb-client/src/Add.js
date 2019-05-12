import React from "react"
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MangaInfo from "./MangaInfo"

const styles = theme => ({});

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            link: undefined,
            isCompleted: false,
            manga: null
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
            this.setState({link: link, manga: undefined});

            const url = '/api/manga/info';
            const fetchOptions = {
                method: 'POST',
                credentials: "same-origin",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({link: link})
            };
            try {
                const response = await fetch(url, fetchOptions);
                if (response.ok) {
                    const result = await response.json();
                    this.setState({manga: result.manga})
                } else
                    this.setState({manga: 'ERROR: Server error'});
            } catch (e) {
                this.setState({manga: 'ERROR: Cannot connect to the server'});
            }
        } else {
            this.setState({link: link, manga: null});
        }
    };

    addManga = async () => {
        const link = this.state.link;

        try {
            this.setState({manga: "Adding manga ..."});
            await this.props.onAddManga(link);
            this.setState({open: false, link: undefined, manga: null});
        } catch (e) {
            alert("ERROR: " + e);
        }
    };

    render() {
        const {classes} = this.props;
        const manga = this.state.manga;
        const showAddButton = (manga !== null && manga !== undefined && typeof manga !== "string");
        return (
            <div>
                <AddIcon onClick={this.onClickOpen}/>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClose}
                    fullWidth={true}
                    maxWidth='sm'
                    aria-labelledby="add-form-dialog-title"
                >
                    <DialogTitle id="add-form-dialog-title"> Add new manga </DialogTitle>
                    <DialogContent>
                        <InputLabel>Enter link</InputLabel>
                        <Input onChange={this.onChangeLink} value={this.state.link}/>

                        <MangaInfo manga={this.state.manga}/>
                    </DialogContent>
                    {(showAddButton) ?
                        <DialogActions>
                            <Button onClick={this.addManga}>Add</Button>
                        </DialogActions> : ''
                    }
                </Dialog>
            </div>
        )
    }
}


export default withStyles(styles)(Add);
