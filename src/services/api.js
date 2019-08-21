import axios from 'axios'

const api = axios.create({
  baseURL: 'https://breakingbadapi.com/api/characters'
})

export default api
