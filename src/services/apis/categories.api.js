import axiosApi from "./axiosApi";
export const getCategories = async () => {
    const {data} = await axiosApi.get('/categories')
    return data
}