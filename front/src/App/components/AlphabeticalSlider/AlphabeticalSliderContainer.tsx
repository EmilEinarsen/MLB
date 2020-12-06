import React from 'react'
import AlphabeticalSlider, { Mark } from './AlphabeticalSlider'
import { scrollContainerChildIntoView } from '../../../Helpers'

interface Tuple {
	0: string,
	1: number
}

interface Props {
	list: Tuple[]
}

const construct = (arr: Tuple[]): Mark[] => 
	arr.map((value): Mark => 
		({ label: value[0], value: arr.length-value[1] })
	)

const AlphabeticalSliderContainer: React.FC<Props> = ({ list }) => {
	const marks = construct(list)
	
	const handleChange = (e: object, value: number | number[]): void => {
		const key = marks.find(mark=>mark.value === value)?.label
		if(!key) return

		scrollContainerChildIntoView({
			container: document.querySelector(".list"), 
			target: document.querySelector(`#group-${key}`), 
			duration: 300 
		})
	}
	
	return (
		<AlphabeticalSlider 
			marks={marks} 
			handleChange={handleChange}
		/>
	)
}

export default AlphabeticalSliderContainer
