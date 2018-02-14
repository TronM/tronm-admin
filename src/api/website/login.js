import axios from 'axios';
import config from '@/config';
import $ from 'jquery';

// const base = config.server.login;

const login = params => axios.post(`${config.server.login}`, params).then(res => res).catch(() => 'error');
const refresh = params => axios.post(`${config.server.oauth2}`, $.param(params), {
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic dHJvbm06MTIzcXdlIUAj'
    }
}).then(res => res).catch(() => Promise.reject('error'));

export default {
    login,
    refresh
};
