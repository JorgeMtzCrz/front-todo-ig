import axios from 'axios';

const baseURL = 'https://todoih.herokuapp.com/auth'
    //const baseURL = 'http://localhost:3000/tasks'


const service = axios.create({ withCredentials: true, baseURL });
export const ALL_URL = baseURL + '/all'

const TASK_SERVICE = {
    CREATE: data => service.post('/create', data),
    DELETE: (id) => service.delete(`/delete/${id}`),
    UPDATE: (id, data) => service.patch(`/update/${id}`, data)
};

export default TASK_SERVICE

export const FETCH_ALL = async url => {
    const response = await fetch(url)
    return await response.json()
}