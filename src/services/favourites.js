import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const favHome = async () => {
    try {
        return axios.get(`${BASE_URL}/home`)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const favIndex = async () => {
    try {
        return axios.get(`${BASE_URL}/favourites`)
    } catch (error) {
        console.log(error);
        throw error
    }
}