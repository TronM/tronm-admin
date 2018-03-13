import instance from '@/helper/axios';

const axios = instance();
const base = '/portfolio';

const insert = params => axios.post(`${base}`, params).then(res => res);
const update = (id, params) => axios.put(`${base}/${id}`, params).then(res => res);
const list = ({page, pagesize, filters}) => {
    let params = {};
    params.rnd = new Date().getTime(); // 防止缓存
    params.sort = { 'created': -1 };
    params.limit = pagesize;
    params.offset = (page - 1) * pagesize;

    if (filters && filters.tag !== '') {
        params.filters = {'tag': {'$in': [filters.tag]}};
    }

    return axios.get(`${base}`, {params}).then(res => res);
};
const del = id => axios.delete(`${base}/${id}`).then(res => res.data);

export default {
    list,
    insert,
    update,
    del
};
