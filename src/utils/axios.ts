import axios from 'axios';

export const serverClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const client = axios.create({
  baseURL: '/api',
});
