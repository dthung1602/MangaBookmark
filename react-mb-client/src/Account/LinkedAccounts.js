import React from "react"
import SocialNetworkInfo from './SocialNetworkInfo';
import NewPrimaryAccountDialog from "./NewPrimaryAccountDialog";
import {withStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";

const styles = () => ({
    danger: {
        border: '1px solid red',
        borderRadius: 5,
        marginTop: 80,
        padding: 20,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    deleteBtn: {
        background: '#f00 !important',
        color: '#fff !important',
    }
});

class LinkedAccounts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            unlinkAccount: '',
        }
    }

    openNewPrimaryAccountDialog = (unlinkAccount) => {
        const {user} = this.props;

        if (user.primaryAccount !== unlinkAccount)
            this.unlink(unlinkAccount, user.primaryAccount)
                .catch(alert);
        else
            this.setState({
                openDialog: true,
                unlinkAccount: unlinkAccount
            });
    };

    closeNewPrimaryAccountDialog = () => {
        this.setState({openDialog: false});
    };

    unlink = async (account, newPrimaryAccount) => {
        const url = `/auth/${account}/unlink?newPrimaryAccount=${newPrimaryAccount}`;
        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin",
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            this.props.loadUserData();
            this.setState({openDialog: false})
        } else
            throw await response.text()
    };

    deleteAccount = () => {
        if (!window.confirm("Are you sure to delete MangaBookmark account?")) return;
        window.location.replace('/api/user/delete')
    };

    render() {
        const {classes, user} = this.props;
        const {openDialog, unlinkAccount} = this.state;

        return (
            <div>
                <SocialNetworkInfo
                    socialNetwork='facebook'
                    id={user.facebookId}
                    pic={user.facebookPic}
                    name={user.facebookName}
                    openNewPrimaryAccountDialog={this.openNewPrimaryAccountDialog}
                />
                <SocialNetworkInfo
                    socialNetwork='google'
                    id={user.googleId}
                    pic={user.googlePic}
                    name={user.googleName}
                    openNewPrimaryAccountDialog={this.openNewPrimaryAccountDialog}
                />

                <div className={classes.danger}>
                    <Button variant='contained' className={classes.deleteBtn} onClick={this.deleteAccount}>
                        Delete account
                    </Button>
                </div>

                <NewPrimaryAccountDialog
                    open={openDialog}
                    user={user}
                    unlink={this.unlink}
                    unlinkAccount={unlinkAccount}
                    closeNewPrimaryAccountDialog={this.closeNewPrimaryAccountDialog}
                    deleteAccount={this.deleteAccount}
                />
            </div>
        )
    }

}

export default withStyles(styles)(LinkedAccounts);