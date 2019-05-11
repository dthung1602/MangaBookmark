import React from "react"
import {withStyles} from "@material-ui/styles";
import {Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Row from "./Row";

const styles = theme => ({});

class MangaTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const onDropManga = this.props.onDropManga;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Status </TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell> Last read chapter </TableCell>
                        <TableCell> Latest chapter </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(d => <Row manga={d} key={d._id} onDropManga={onDropManga} />)}
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)(MangaTable);