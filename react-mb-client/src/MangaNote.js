import React from "react"
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save"
import CancelIcon from "@material-ui/icons/Cancel"
import EditIcon from "@material-ui/icons/Edit"

const styles = () => ({
    actionBtn: {
        padding: 2,
        margin: '3px 0px 0px 15px',
        borderRadius: 3,
        display: 'inline-block',
        '&:hover': {
            cursor: 'pointer',
            background: '#efa230',
            color: '#fff'
        }
    },

    noteBtnGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '10px 0 15px 0'
    }
});

class MangaNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {note: null};
    }

    onNoteEdited = (event) => {
        this.setState({note: event.target.value})
    };

    editNoteClicked = () => {
        this.setState({note: this.props.mangaNote})
    };

    cancelEditNote = () => {
        this.setState({note: null});
    };

    saveNote = () => {
        this.props.saveNote(this.state.note);
        this.setState({note: null});
    };

    render() {
        const {classes} = this.props;
        const mangaNote = this.props.mangaNote;
        const note = this.state.note;

        if (note == null)
            return (
                <div>
                    <div>
                        {(mangaNote === '') ? (<i>Nothing to show</i>) : mangaNote}
                    </div>
                    <div className={classes.noteBtnGroup} onClick={this.editNoteClicked}>
                        <EditIcon className={classes.actionBtn} fontSize={"small"} titleAccess='Edit'/>
                    </div>
                </div>
            );

        return (
            <div>
                <TextField
                    fullWidth
                    value={note}
                    onChange={this.onNoteEdited}
                />
                <div className={classes.noteBtnGroup}>
                    <SaveIcon
                        className={classes.actionBtn}
                        titleAccess='Save'
                        onClick={this.saveNote}
                    />
                    <CancelIcon
                        className={classes.actionBtn}
                        titleAccess='Cancel'
                        onClick={this.cancelEditNote}
                    />
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(MangaNote);