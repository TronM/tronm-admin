import axios from '@/helper/axios';

const base = '/portfolio';

const insert = params => axios.post(`${base}`, params).then(res => res);
const update = (id, params) => axios.put(`${base}/${id}`, params).then(res => res);
const list = params => {
    let _params = {};
    _params.sort = { 'created': -1 };
    _params.limit = params.pagesize;
    _params.offset = (params.page - 1) * params.pagesize;

    if (params.filters && params.filters.tag !== '') {
        _params.filters = {'tag': {'$in': [params.filters.tag]}};
    }

    return axios.get(`${base}`, {params: _params}).then(res => res);
};
const del = id => axios.delete(`${base}/${id}`).then(res => res.data);

export default {
    list,
    insert,
    update,
    del
};
