import { makeStyles } from '@material-ui/core'
import Slider, { Mark as MuiMark } from '@material-ui/core/Slider'
import React from 'react'

export interface Mark extends MuiMark {  }

interface Props {
	marks: Mark[],
	handleChange: (e: object, value: number | number[]) => void
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '90vh',
		position: 'fixed',
		right: `calc( 50vw - ${theme.spacing(5)}px )`
	},
	markLabel: {
		marginLeft: -theme.spacing(4)
	},
	rail: {
		backgroundColor: '#aaa'
	},
	thumb: {
		backgroundColor: '#555',
		height: 6,
		width: 6,
		margin: '0 -2.5px -2.5px -2.5px !important',
	}
}))

const AlphabeticalSlider: React.FC<Props> = ({
	marks,
	handleChange
}) => {
	const {
		root,
		...rest
	} = useStyles()

	return (
		<div className={root}>
			<Slider
				orientation="vertical"
				defaultValue={marks.length}
				max={marks.length}
				min={1}
				marks={marks}
				classes={rest}
				track={false}
				onChange={handleChange}
			/>
		</div>
	)
}
export default AlphabeticalSlider
