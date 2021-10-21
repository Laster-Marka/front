import axios from 'axios'
axios.defaults.withCredentials = true
export const http = axios.create({
  baseURL: 'https://laster-marka-back.herokuapp.com',
  withCredentials: true,
})
