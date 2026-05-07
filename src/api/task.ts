import axios from "axios"
import { data } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL


export const getStats = async () => {
    try {
        const res = await axios.get(`${API_URL}/projectTask/getStats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const dailyStats = async (startDate: string, endDate: string) => {
    try {
        const res = await axios.get(`${API_URL}/projectTask/getDailyStats`, {
            params: {
                startDate,
                endDate,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
          console.log("DAILY STATS RESPONSE:", res.data)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}