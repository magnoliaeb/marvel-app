import axios from 'axios'
import { config } from './config'

const HTTP = axios.create({
    baseURL: config.URL_BASE,
    params: {
        apikey: config.API_KEY
    },
    
})

export default HTTP