import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default createMuiTheme({
    palette: {
        primary: {
            main: '#00bea6'
        },
        secondary: {
            main: '#efa230'
        }
    },
    overrides: {
        MuiTableCell: {
            head: {
                paddingRight: 30,
                paddingLeft: 20
            },
            body: {
                paddingRight: 30,
                paddingLeft: 20,
                // verticalAlign: "top"
            }
        },
        MuiTableRow: {
            root: {
                '&:hover': {
                    background: 'rgba(240,240,240,0.47)'
                }
            }
        },
        MuiInputBase: {
            root: {
                // minWidth: 175,
            }
        }
    }
});