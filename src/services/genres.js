import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const genreIndex = async () => {
    try {
        return axios.get(`${BASE_URL}/genres`)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const singleGenre = async (genreId) => {
    try {
        return axios.get(`${BASE_URL}/genres/${genreId}`)
    } catch (error) {
        console.log(error);
        throw error
    }
}