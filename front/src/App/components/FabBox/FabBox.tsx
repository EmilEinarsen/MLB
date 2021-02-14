import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        display: 'flex',
		alignItems: 'end',
        bottom: theme.spacing(2),
        right: 'calc(25vw - 40px)',
        gap: theme.spacing(2),
    }
}))

const FabBox = (bind: any) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            { bind.children }
        </Box>
    )
} 

export default FabBox