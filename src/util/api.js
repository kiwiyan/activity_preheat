
import axios from 'axios';
let host = 'localhost';
export default {
    getPhoneCode() {
        return axios.get(`${host}/`);
    }
}