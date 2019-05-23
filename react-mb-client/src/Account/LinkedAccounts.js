import React from "react"
import SocialNetworkInfo from './SocialNetworkInfo';

class LinkedAccounts extends React.Component {

    render() {
        const {user} = this.props;

        return (
            <div>
                <SocialNetworkInfo
                    socialNetwork='facebook'
                    id={user.facebookId}
                    pic={user.facebookPic}
                    name={user.username}
                />
                <SocialNetworkInfo
                    socialNetwork='google'
                    id={user.googleId}
                    pic={user.googlePic}
                    name={user.username}
                />
            </div>
        )
    }

}

export default LinkedAccounts;