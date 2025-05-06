import axios from 'axios';
import { baseUrl, apiKey } from '../config';

const Api = axios.create({
  baseURL: baseUrl,
  headers: {
    'apiKey': apiKey,
    'Content-Type': 'application/json'
  }
});

export default Api;
