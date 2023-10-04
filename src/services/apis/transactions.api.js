import axiosApi from "./axiosApi";
export const getTransactions = async () => {
    const {data} = await axiosApi.get('/transactions')
    return data
}

export const deleteTransaction = async (id) => {
    const {data} = await axiosApi.delete(`/transactions/${id}`)
    return data
}


export const updateTransaction = async (id, body) => {
    const {data} = await axiosApi.put(`/transactions/` + id, body)
    return data
}

export const postTransaction = async (body) => {
    const {data} = await axiosApi.post(`/transactions`, body)
    return data
}