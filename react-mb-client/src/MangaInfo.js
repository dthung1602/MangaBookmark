import React from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    mangaImg: {
        width: 150
    },
    mangaInfo: {
        padding: '30px 20px 0 20px'
    },
    error: {
        padding: '30px 20px 0 0',
        color: '#f00'
    },
    mangaName: {
        color:'#009d8a'
    }
});

class MangaInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const manga = this.props.manga;

        if (manga === null)
            return <span/>;

        if (manga === undefined)
            return (
                <Typography className={classes.mangaInfo}>Loading manga info ...</Typography>
            );

        if (typeof manga === 'string')
            return (
                <Typography className={classes.error}>{manga}</Typography>
            );

        return (
            <Grid className={classes.mangaInfo} container>
                <Grid item md={4}>
                    <img className={classes.mangaImg} src={manga.image} alt={manga.name}/>
                </Grid>
                <Grid item md={8}>
                    <Typography variant={"h6"}>{manga.name}</Typography>
                    <Typography variant={"subtitle1"}>Number of chapters: {manga.chapterCount}</Typography>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(MangaInfo);