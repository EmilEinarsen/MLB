import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { default as useMediaQueryMui } from '@material-ui/core/useMediaQuery'

export enum direction {
    'up',
    'down'
}

const useMediaQuery = (
    {size='sm', d=direction.down}
    : { size?: number | "xs" | "sm" | "md" | "lg" | "xl", d?: direction.up | direction.down }
): boolean => {
    const theme = useTheme()
	const matches = useMediaQueryMui( 
        d === direction.up 
            ? theme.breakpoints.up(size)
            : theme.breakpoints.down(size)
    )
    
    return matches
}

export default useMediaQuery
