import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mern-points-generator.onrender.com/api',
});

export default API;
