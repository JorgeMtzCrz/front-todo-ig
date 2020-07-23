import axios from 'axios';

const baseURL = 'https://todoih.herokuapp.com/auth'
    //const baseURL = 'http://localhost:3000/auth'


const service = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
    SIGNUP: form => service.post('/signup', form),
    LOGIN: form => service.post('/login', form),
    CURRENT_USER: () => service.get('/logged'),
    LOGOUT: () => service.get('/logout')
};

export default AUTH_SERVICE;