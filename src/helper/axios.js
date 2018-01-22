import axios from 'axios';
import { Loading, Notification } from 'element-ui';
import config from '../config';

const instance = axios.create({
    baseURL: config.apiServer,
    withCredentials: true,
    timeout: 5000
});

let loadingInstancce = null;

instance.interceptors.request.use((require) => {
    // 全屏遮罩
    loadingInstancce = Loading.service({
        fullscreen: true,
        spinner: 'el-icon-loading',
        text: '加载中'
    });
    return require;
});

instance.interceptors.response.use((response) => {
    loadingInstancce.close();
    const { data, config } = response;
    if (data.code === 200 && (config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
        Notification.success({
            title: '操作成功'
        });
    } else if (data.code !== 200) {
        Notification.error({
            title: data.msg
        });
    }
    return data;
}, (error) => {
    return error;
});

export default instance;
