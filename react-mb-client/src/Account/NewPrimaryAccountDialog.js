import React from "react"
import {withStyles} from "@material-ui/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {capitalize} from "@material-ui/core/utils/helpers";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const styles = () => ({});

class NewPrimaryAccountDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {newPrimaryAccount: 'local'}
    }

    isLastAccount = () => {
        const {user} = this.props;
        let c = 0;
        if (user.username) c++;
        if (user.facebookId) c++;
        if (user.googleId) c++;
        return c === 1;
    };

    changeAccount = (event) => {
        this.setState({newPrimaryAccount: event.target.value});
    };

    select = () => {
        this.props.unlink(this.props.unlinkAccount, this.state.newPrimaryAccount)
            .catch(alert)
    };

    render() {
        const {open, unlinkAccount, user, closeNewPrimaryAccountDialog} = this.props;
        const {newPrimaryAccount} = this.state;

        if (this.isLastAccount())
            return (
                <Dialog
                    open={open}
                    fullWidth
                    maxWidth='sm'
                    aria-labelledby="primary-acc-dialog-title"
                >
                    <DialogTitle id="primary-acc-dialog-title"> Delete account</DialogTitle>
                    <DialogContent>
                        <Typography> {capitalize(unlinkAccount)} account is your only way to log in to Manga
                            Bookmark</Typography>
                        <Typography>You cannot unlink it</Typography>
                        <Typography>To delete account, go to other tab</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"secondary"}
                                onClick={closeNewPrimaryAccountDialog}>OK</Button>
                    </DialogActions>
                </Dialog>
            );

        const disableLocal = !user.username || unlinkAccount === 'local';
        const disableFacebook = !user.facebookId || unlinkAccount === 'facebook';
        const disableGoogle = !user.googleId || unlinkAccount === 'google';
        
        return (
            <Dialog
                open={open}
                fullWidth
                maxWidth='sm'
                aria-labelledby="primary-acc-dialog-title"
            >
                <DialogTitle id="primary-acc-dialog-title"> New primary account</DialogTitle>
                <DialogContent>
                    <Typography> {capitalize(unlinkAccount)} account is currently used as your primary
                        account</Typography>
                    <Typography>To unlink it, you must select another account as primary account</Typography>
                    <RadioGroup
                        aria-label="Primary account"
                        value={newPrimaryAccount}
                        onChange={this.changeAccount}
                    >
                        <FormControlLabel
                            value="local"
                            control={<Radio/>}
                            label="MangaBookmark account"
                            disabled={disableLocal}
                        />
                        <FormControlLabel
                            value="google"
                            control={<Radio/>}
                            label="Google account"
                            disabled={disableGoogle}
                        />
                        <FormControlLabel
                            value="facebook"
                            control={<Radio/>}
                            label="Facebook account"
                            disabled={disableFacebook}
                        />
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"secondary"} onClick={this.select}>Select</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default withStyles(styles)(NewPrimaryAccountDialog);
