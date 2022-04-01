import axios from 'axios'
import {getCurrentUser} from './helpers/Cookies/LocalStorage'

const auth = getCurrentUser();

let token = ''

if(auth) token = auth;

let baseURL = process.env.REACT_APP_API_URL

const customInstance = axios.create({
  baseURL: baseURL,
  headers: { 'Authorization': token }
})

export default customInstance