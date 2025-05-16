import axios from "axios";
import { getToken } from "../utils/auth";

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
        return axios.get(`${BASE_URL}/favourites`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const favCreate = async (mediaId) => {
    try {
        return axios.post(`${BASE_URL}/medias/${mediaId}/fav`, null, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}
export const favDelete = async (mediaId) => {
    try {
        return axios.delete(`${BASE_URL}/medias/${mediaId}/fav`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}