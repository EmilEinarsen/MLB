import { useEffect, useRef } from "react"
import data from "../Providers/serverData"
import useServer, { ACTION } from "./useServer"


const useInitialFetch = () => {
    const initial = useRef(true)
    const [ state, execute ] = useServer(ACTION.get, undefined, false)
    
    useEffect(() => {
        
        state.value && Object.assign(data, state.value)

    }, [state.value])

    if(initial.current) {
        initial.current = false
        execute()
    } 

    return state
}

export default useInitialFetch