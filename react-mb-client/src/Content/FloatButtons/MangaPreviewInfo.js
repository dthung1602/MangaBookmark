import React from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/index";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
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
        color: '#009d8a'
    }
});

class MangaPreviewInfo extends React.Component {

    render() {
        const {classes} = this.props;
        const data = this.props.data;
        const mangaStatus = this.props.mangaStatus;

        if (mangaStatus === 'none')
            return '';

        if (mangaStatus === 'waiting')
            return (
                <Typography className={classes.mangaInfo}>{data}</Typography>
            );

        if (mangaStatus === 'error')
            return (
                <Typography className={classes.error}>{data}</Typography>
            );

        if (mangaStatus === 'ok')
            return (
                <Grid className={classes.mangaInfo} container>
                    <Grid item md={4}>
                        <img className={classes.mangaImg} src={data.image} alt={data.name}/>
                    </Grid>
                    <Grid item md={8}>
                        <Typography variant={"h6"}>{data.name}</Typography>
                        <Typography variant={"subtitle1"}>Number of chapters: {data.chapterCount}</Typography>
                        <Typography variant={"subtitle1"}>Is completed: {'' + data.isCompleted}</Typography>
                    </Grid>
                </Grid>
            );

        throw new Error("Invalid mangaStatus property");
    }

}

export default withStyles(styles)(MangaPreviewInfo);