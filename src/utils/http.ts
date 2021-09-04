import axios from 'axios';

/**
 * Util to make http requests.
 */
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
