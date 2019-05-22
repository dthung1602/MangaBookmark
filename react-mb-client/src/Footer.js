import React from "react"
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    footer: {
        margin: '30px 0 0 0',
        padding: '20px 30px 30px 30px',
        background: '#00bea6',
        color: '#fff'
    },
    social: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
    },
    socialIcon: {
        margin: '0 20px'
    }
});

function Footer(props) {
    const {classes} = props;

    return (
        <footer className={classes.footer}>
            <div className={classes.social}>
                {/** logo here */}
            </div>
            <hr/>
            <div>
                <div>Build with <a>ExpressJS</a> and <a>Material UI</a></div>
                <div>Logo from <a>xxx</a></div>
            </div>
        </footer>
    )
}

export default withStyles(styles)(Footer);