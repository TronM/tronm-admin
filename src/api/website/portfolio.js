import axios from '@/helper/axios';

const base = '/portfolio';

const insert = params => axios.post(`${base}`, params).then(res => res);
const update = (id, params) => axios.put(`${base}/${id}`, params).then(res => res.data);
const list = params => axios.get(`${base}`, {params: { limit: params.pagesize, offset: (params.page - 1) * params.pagesize }}).then(res => res);
const del = id => axios.delete(`${base}/${id}`).then(res => res.data);

export default {
    list,
    insert,
    update,
    del
};
