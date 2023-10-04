import { createContext, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { deleteTransaction, getTransactions } from "services/apis/transactions.api";

export const transActionsContext = createContext()

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
        case 'STOP_LOADING':
            return { ...state, loading: false }
            default: 
            return state
    }
}

export const TransactionsProvider = ({ children }) => {
    const [state, disptch ] = useReducer(contextReducer , initialState)
    const [filters, setFilters] = useState({
        keys: null,
        category: null,
        type: null
    })
    
    const isMount = useRef(false)
    
    const fetchData = useCallback(async () => {
        disptch({ type: 'FETCH_START' })
        try {
            const data = await getTransactions()
            disptch({ type: 'FETCH_SUCCESS', payload: data })
        } catch (error) {
            disptch({ type: 'FETCH_ERROR', payload: error.message })
        }
    }, [])
    
    const handleDelete = async (id) => {
        try {
            disptch({ type: 'FETCH_START' })
            await deleteTransaction(id)
            fetchData()
        }
        catch (error) {
            disptch({ type: 'FETCH_ERROR', payload: error.message })
        }
    }


    useEffect(() => {
        if(!isMount.current) {
            fetchData()
            isMount.current = true
        }
    }, [fetchData])



    const filtering = (filteredata) => {
    setFilters(filteredata)
    }


    const filteredData = useMemo(() => {
        let data = [...state.data]

        if(!data || !data.length) {
            return []
        }

        if(filters.keys && filters.keys === 'date') {
            data = data.sort((a, b) => {
                const aDate = new Date(a.date).getTime()
                const bDate = new Date(b.date).getTime()
                return bDate - aDate
            })
        }

        if(filters.keys && filters.keys === 'amount') {
            data = data.sort((a, b) => {
                return +b.amount - +a.amount
            })
        }

        if (filters.keys === 'alphabetical') {
            data = data.sort((a, b) => {
                const nameA = (a.title || '').toLowerCase()
                const nameB = (b.title || '').toLowerCase()
                return nameA.localeCompare(nameB)
            })
        }


        if(filters.category) {
            data = data.filter(d => d.category === filters.category)
        }


        if(filters.type) {
            // eslint-disable-next-line eqeqeq
            data = data.filter(d => d.type == filters.type)
        }

        return data

    }, [state.data, filters])


    const totals = useMemo(() => {
        let income = 0
        let exepanse = 0

        if(state.data && state.data.length) {
            state.data.forEach(d => {
                if(d.type === 'income') {
                    income += +d.amount
                }else {
                    exepanse += +d.amount
                }
            })
        }
        return {
            income, exepanse, total: income - exepanse
        }
    }, [state.data])

    return(
        <transActionsContext.Provider
            value={{
                ...state,
                filteredData,
                totals,
                handleDelete,
                fetchData,
                filtering
            }}>
            { children }
        </transActionsContext.Provider>
    )
}