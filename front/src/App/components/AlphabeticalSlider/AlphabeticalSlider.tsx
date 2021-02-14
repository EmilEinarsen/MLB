import React from 'react'
import { makeStyles } from '@material-ui/core'
import Slider, { Mark as MuiMark } from '@material-ui/core/Slider'

export interface Mark extends MuiMark {  }

interface Props {
	marks: Mark[],
	handleChange: (e: object, value: number | number[]) => void
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '50vh',
		position: 'fixed'
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
	const { root, ...slider} = useStyles()

	return (
		marks.length ?
			<div className={root}>
				<Slider
					key={'slider-'+marks.length}
					orientation="vertical"
					defaultValue={marks.length}
					max={marks.length}
					min={1}
					marks={marks}
					classes={slider}
					track={false}
					onChange={handleChange}
				/>
			</div>
		: <></>
	)
}
export default AlphabeticalSlider
