import React from 'react'
import Loader from 'react-loader-spinner'
import useReduceMotion from '../Hooks/useReduceMotion'

const bind = (reduceMotion:  boolean) => (
	reduceMotion ? {
		type: 'Bars',
		color: "#6c757d",
		height: 175,
		width: 175,
	} : {
		type: 'ThreeDots',
		color: "#6c757d",
		height: 100,
		width: 100,
	}
)

interface Props {
	loading: any
}

const LoadingScreen: React.FC<Props> = ({ loading }) => {
	const reduceMotion = useReduceMotion()
	
	return loading ? 
			<div style={{ position: 'absolute', top: 0, left: 0, background: '#F5F5F5' }}>
				<div style={{ display: 'grid', height: '100vh', width: '100vw', placeContent: 'center' }}>
					<Loader { ...bind(!reduceMotion) } />
				</div>
			</div>
		: <></>
	
}

export default LoadingScreen