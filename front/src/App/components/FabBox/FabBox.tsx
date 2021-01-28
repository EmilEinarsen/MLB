import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        display: 'flex',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        gap: theme.spacing(2),
    }
}))

const FabBox = (bind: any) => {
    const classes = useStyles();

    return (
        <Box className={classes.fab}>
            { bind.children }
        </Box>
    )
} 

export default FabBox