import axios from 'axios'

export const http = axios.create({
  //TODO: Set base url
  baseURL: 'https://jsonplaceholder.typicode.com/'
})
