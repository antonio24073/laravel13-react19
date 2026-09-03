import Axios from 'axios'
import { apiUrl, rootUrl } from './App'

export const Http = Axios.create({
    baseURL: rootUrl
})

export const HttpAuth = Axios.create({
    baseURL: apiUrl
})

HttpAuth.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

HttpAuth.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)