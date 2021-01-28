import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const initial = window.matchMedia(QUERY)

/**
 * @returns {boolean}
 */
const useReduceMotion = () => {
	const [matches, setMatch] = useState(initial.matches)

	useEffect(() => {
		const handleChange = () => setMatch(initial.matches)

		handleChange()
		
		initial.addEventListener('change', handleChange)
		return () => {
			initial.removeEventListener('change', handleChange)
		}
	})
	
  	return matches
}

export default useReduceMotion