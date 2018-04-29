import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://poll-10186.firebaseio.com/'
});

export default instance;
