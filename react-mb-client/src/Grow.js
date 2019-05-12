import React from "react";
import {withStyles} from "@material-ui/styles";

function Grow(props) {
    return <span className={props.classes.grow}/>
}

const style = () => ({
    grow: {
        flexGrow: 1
    }
});

export default withStyles(style)(Grow);