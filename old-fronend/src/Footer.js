import React from "react"
import {withStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import FACEBOOK_ICON from "./static/iconmonstr-facebook-4-48.png";
import EMAIL_ICON from "./static/iconmonstr-email-10-48.png";
import GITHUB_ICON from "./static/iconmonstr-github-1-48.png";
import {Link} from "react-router-dom";

const FACEBOOK_URL = 'https://www.facebook.com/thanhhung.duong.18';
const EMAIL_URL = 'mailto:dthung1602@gmail.com';
const GITHUB_URL = 'https://github.com/dthung1602';

const styles = () => ({
    footer: {
        margin: '50px 0 0 0',
        boxShadow: '0 -5px 7px #aaa',
        padding: '20px 30px 30px 30px',
        background: '#00bea6',
        color: '#fff'
    },
    social: {
        display: 'flex',
        justifyContent: 'center',
    },
    socialIcon: {
        width: 32,
        height: 32,
        margin: '5px 20px',
        '&:hover': {
            zoom: '110%'
        }
    },
    footerText: {
        color: '#fff !important',
        fontStyle: 'italic'
    },
    footerHr: {
        color: '#fff'
    },
    footerInternalLink: {
        textTransform: 'capitalize',
        cursor: 'pointer',
        padding: 10,
        '&hover': {
            fontWeight: 'bold'
        }
    },
    footerLink: {
        color: '#fff !important',
        textDecoration: 'none',
        '&:visited': {
            color: '#fff',
        },
        '&:hover': {
            color: '#fff',
            fontWeight: 'bold',
            textDecoration: 'underline'
        }
    },
    noUnderline: {
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center'
    }
});

function Footer(props) {
    const {classes, isLogin, redirectToIndex, redirectToAccount, logout} = props;

    const internalLinkClass = classes.footerLink + ' ' + classes.footerInternalLink;

    return (
        <footer className={classes.footer}>

            <div className={classes.social}>
                <a href={GITHUB_URL}>
                    <img className={classes.socialIcon} src={GITHUB_ICON} alt='GITHUB'/>
                </a>
                <a href={EMAIL_URL}>
                    <img className={classes.socialIcon} src={EMAIL_ICON} alt='EMAIL'/>
                </a>
                <a href={FACEBOOK_URL}>
                    <img className={classes.socialIcon} src={FACEBOOK_ICON} alt='FACEBOOK'/>
                </a>
            </div>

            <div className={classes.nav}>
                <Typography className={internalLinkClass} onClick={redirectToIndex}>HOME</Typography>
                <Link to='/about' className={classes.noUnderline}>
                    <Typography className={internalLinkClass}>ABOUT</Typography>
                </Link>
                <Link to='/legalnotice' className={classes.noUnderline}>
                    <Typography className={internalLinkClass}>LEGAL NOTICE</Typography>
                </Link>
                {(isLogin)
                    ? <Typography className={internalLinkClass} onClick={redirectToAccount}>ACCOUNT</Typography>
                    : <Typography className={internalLinkClass} onClick={logout}>LOGOUT</Typography>
                }
            </div>

            <hr className={classes.footerHr}/>

            <div>
                <Typography className={classes.footerText}>
                    Build with <a className={classes.footerLink} href='https://expressjs.com/'>ExpressJS</a>&nbsp;
                    and <a className={classes.footerLink} href='https://material-ui.com/'>Material UI</a>
                </Typography>
                <Typography className={classes.footerText}>
                    with images from <a className={classes.footerLink} href='https://looka.com/'>Looka</a>&nbsp;
                    and <a className={classes.footerLink} href='https://iconmonstr.com'>iconmonstr</a>
                </Typography>
            </div>

        </footer>
    )
}

export default withStyles(styles)(Footer);