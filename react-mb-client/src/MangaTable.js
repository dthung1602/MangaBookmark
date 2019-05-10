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
                    {data.map(d => <Row manga={d}/>)}
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)(MangaTable);