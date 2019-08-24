import React from "react";
import {Input, Switch, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/index";
import withStyles from "@material-ui/core/styles/withStyles";

import SelectFollowing from "../Header/SelectFollowing"
import ChapterList from "../Row/ChapterList";

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
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    label: {
        paddingRight: 15,
        paddingBottom: 3
    },
});

class MangaPreviewInfo extends React.Component {

    render() {
        const {classes, manga, mangaStatus} = this.props;

        if (mangaStatus === 'none')
            return '';

        if (mangaStatus === 'waiting')
            return (
                <Typography className={classes.mangaInfo}>{manga}</Typography>
            );

        if (mangaStatus === 'error')
            return (
                <Typography className={classes.error}>{manga}</Typography>
            );

        const {chapters} = manga;

        if (mangaStatus === 'ok')
            return (
                <Grid className={classes.mangaInfo} container>
                    <Grid item md={4}>
                        <img className={classes.mangaImg} src={manga.image} alt={manga.name}/>
                    </Grid>
                    <Grid item md={8}>
                        <Typography variant={"h5"}><b>{manga.name}</b></Typography>
                        <div className={classes.flex}>
                            <Typography variant={"subtitle1"}>Is completed: {'' + manga.isCompleted}</Typography>
                            <Switch
                                checked={manga.isCompleted}
                                onChange={this.props.onCompletedChange}
                                color={"secondary"}
                            />
                        </div>
                        <SelectFollowing
                            following={manga.following}
                            onChange={this.props.onFollowingChange}
                        />
                        <div className={classes.flex}>
                            <Typography className={classes.label} variant={"subtitle1"}>Chapter list</Typography>
                            <ChapterList
                                chapters={chapters}
                                onChangeChapter={this.props.onChangeChapter}
                                onMarkAllChaptersRead={this.props.onMarkAllChaptersRead}
                                showNextChapBtn={false}
                                onMarkUpTo={this.props.onMarkUpTo}
                                markAllRead='before'
                            />
                        </div>
                        <div className={classes.flex}>
                            <Typography className={classes.label} variant={"subtitle1"}>Note</Typography>
                            <Input
                                value={manga.note}
                                onChange={this.props.onChangeNote}
                            />
                        </div>
                    </Grid>
                </Grid>
            );
    }

}

export default withStyles(styles)(MangaPreviewInfo);