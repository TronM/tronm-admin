import instance from '@/helper/axios';
import config from '@/config';
// import $ from 'jquery';

const axios = instance(config.server.iam);
// const base = config.server.login;

const insert = params => axios.post('/user', params).then(res => res).catch(() => 'error');
const list = params => {
    let _params = {};
    _params.rnd = new Date().getTime(); // 防止缓存
    _params.sort = { 'created': -1 };
    _params.limit = params.pagesize;
    _params.offset = (params.page - 1) * params.pagesize;

    return axios.get('/user', {params: _params}).then(res => res);
};

export default {
    insert,
    list
};
