import React from "react"
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
    flex: {
        display: 'flex'
    },
    grow: {
        flexGrow: 1
    }
});

class LoadMore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.flex}>
                <div className={classes.grow}/>
                <Button variant={"contained"} color={"primary"}>Load more</Button>
                <div className={classes.grow}/>
            </div>
        )
    }
}

export default withStyles(styles)(LoadMore);