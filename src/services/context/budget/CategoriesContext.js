import { createContext, useCallback, useEffect, useReducer, useRef } from "react";
import { getCategories } from "services/apis/categories.api";

export const CategoriesContext = createContext()

const initialState = {
    data: [],
    loading: true,
    error: null
}

const contextReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_START': 
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS': 
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload }
            default: 
            return state
    }
}

export const CategoriesProvider = ({ children }) => {
    const [state, disptch ] = useReducer(contextReducer , initialState)
    const isMount = useRef(false)
    
    const fetchData = useCallback(async () => {
        disptch({ type: 'FETCH_START' })
        try {
            const data = await getCategories()
            disptch({ type: 'FETCH_SUCCESS', payload: data })
        } catch (error) {
            disptch({ type: 'FETCH_ERROR', payload: error.message })
        }
    }, [])

    useEffect(() => {
        if(!isMount.current) {
            fetchData()
            isMount.current = true
        }
    }, [fetchData])

    return(
        <CategoriesContext.Provider value={{ ...state }}>
            { children }
        </CategoriesContext.Provider>
    )
}