import React from "react"
import {withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
    infoHeader: {
        fontWeight: 550,
    },
    mangaName: {
        color: '#525252',
        fontSize: '130%',
        fontWeight: 900,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: '#000'
        }
    },
    mangaDetails: {
        marginTop: 20
    },
});

class MangaInfoCell extends React.Component {

    render() {
        const {classes} = this.props;
        const manga = this.props.manga;

        return (
            <div>
                <div>
                    <a className={classes.mangaName} href={manga.link} target="_blank">{manga.name}</a>
                </div>
                <Grid container  className={classes.mangaDetails}>

                    <Grid item xs={4} className={classes.infoHeader}>Source</Grid>
                    <Grid item xs={8}>{manga.source}</Grid>

                    <Grid item xs={4} className={classes.infoHeader}>Total chapters</Grid>
                    <Grid item xs={8}>{manga.chapters.length}</Grid>

                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(MangaInfoCell);