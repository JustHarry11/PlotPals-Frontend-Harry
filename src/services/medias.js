import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const mediasIndex = async () => {
    try {
        return axios.get(`${BASE_URL}/medias`)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const singleMedia = async (mediaId) => {
    try {
        return axios.get(`${BASE_URL}/medias/${mediaId}`)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const createMedia = async (formData) => {
    try {
        return axios.postForm(`${BASE_URL}/medias`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const updateMedia = async (mediaId, formData) => {
    try {
        return axios.putForm(`${BASE_URL}/medias/${mediaId}`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteMedia = async (mediaId) => {
    try {
        return axios.delete(`${BASE_URL}/medias/${mediaId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}