import React from "react"
import SocialNetworkInfo from './SocialNetworkInfo';
import NewPrimaryAccountDialog from "./NewPrimaryAccountDialog";

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

    render() {
        const {user} = this.props;
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
                <NewPrimaryAccountDialog
                    open={openDialog}
                    user={user}
                    unlink={this.unlink}
                    unlinkAccount={unlinkAccount}
                    closeNewPrimaryAccountDialog={this.closeNewPrimaryAccountDialog}
                />
            </div>
        )
    }

}

export default LinkedAccounts;