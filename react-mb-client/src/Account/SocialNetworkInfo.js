import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import {capitalize} from "@material-ui/core/utils/helpers";
import DeleteIcon from "@material-ui/icons/Close";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";

const styles = () => ({
    socialInfoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    socialNetworkName: {
        color: '#666 !important',
        fontWeight: 'bold !important'
    },
    socialInfoPic: {
        width: 50,
        height: 50
    },
    name: {
        padding: '0 30px 0 8px',
        fontSize: '120% !important',
        color: 'grey'
    },
    account: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    deleteBtn: {
        padding: 2,
        margin: 0,
        borderRadius: 3,
        display: 'inline-block',
        '&:hover': {
            cursor: 'pointer',
            background: '#f00',
            color: '#fff'
        }
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        '&:visited': {
            color: '#fff'
        }
    },
    buttonText: {
        color: '#fff !important'
    },
    wrapper: {
        marginBottom: 30
    }
});

class SocialNetworkInfo extends Component {

    openNewPrimaryAccountDialog = () => {
        this.props.openNewPrimaryAccountDialog(this.props.socialNetwork);
    };

    render() {
        const {id, socialNetwork, pic, name, classes} = this.props;
        let content;
        if (id)
            content =
                <div className={classes.socialInfoContainer}>
                    <span/>
                    <div className={classes.account}>
                        <img className={classes.socialInfoPic} src={pic} alt='pic'/>
                        <Typography className={classes.name}>{name}</Typography>
                    </div>
                    <span className={classes.deleteBtn} onClick={this.openNewPrimaryAccountDialog}>
                        <DeleteIcon/>
                    </span>
                </div>;
        else {
            let buttonText =
                <Typography className={classes.buttonText} variant={"button"}>
                    Link with {socialNetwork} account
                </Typography>;

            if (socialNetwork === 'google')
                content =
                    <a href='/auth/google' className={classes.link}>
                        <GoogleLoginButton>{buttonText}</GoogleLoginButton>
                    </a>;
            if (socialNetwork === 'facebook')
                content =
                    <a href='/auth/facebook' className={classes.link}>
                        <FacebookLoginButton>{buttonText}</FacebookLoginButton>
                    </a>;
        }

        return (
            <div className={classes.wrapper}>
                <Typography variant='h6' className={classes.socialNetworkName}>
                    {capitalize(socialNetwork) + ' account'}
                </Typography>
                {content}
            </div>
        );
    }
}

export default withStyles(styles)(SocialNetworkInfo);