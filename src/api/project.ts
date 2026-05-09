import axios from "axios"
import { data } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

export const getProjects = async (signal?: AbortSignal) => {
    try {
        const res = await axios.get(`${API_URL}/project/getAll`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            signal
        })
        return res.data
    } catch (error) { 
        if (axios.isCancel(error)) {
            console.log("getProject request cancelled")
            return null
        }
        console.error(error)
        throw error 
    }

}