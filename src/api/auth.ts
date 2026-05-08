import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL


export const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    })

    console.log({
        email,
        password,
        })

    return res.data
}

export const getMe = async (signal?: AbortSignal) => {
  const res = await axios.get(`${API_URL}/user/getme`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    signal
  })

  return res.data
}


export const register = async (email: string, name: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/register`, {
      email,
      name,
      password,
  })

  return res.data
}