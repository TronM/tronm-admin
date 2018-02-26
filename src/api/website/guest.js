import instance from '@/helper/axios';
import config from '@/config';
// import $ from 'jquery';

const axios = instance(config.server.iam);
// const base = config.server.login;

const insert = params => axios.post('/user', params).then(res => res).catch(() => 'error');

export default {
    insert
};
