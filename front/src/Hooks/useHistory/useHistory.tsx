import { useContext } from 'react'
import { contextHistory } from '../../Providers/HistoryProvider'

const useHistory = () => {
	const history = useContext(contextHistory)
	return history
}

export default useHistory
