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
                    name={user.facebookName}
                />
                <SocialNetworkInfo
                    socialNetwork='google'
                    id={user.googleId}
                    pic={user.googlePic}
                    name={user.googleName}
                />
            </div>
        )
    }

}

export default LinkedAccounts;