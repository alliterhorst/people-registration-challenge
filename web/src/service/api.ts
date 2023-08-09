import axios from 'axios';

const timeout = 60000;

export const backendApi = axios.create({
  timeout,
});
