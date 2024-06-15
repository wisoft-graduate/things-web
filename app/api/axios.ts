import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://52.79.229.237:8080/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default instance
