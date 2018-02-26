import axios from 'axios';
import { Loading, Notification } from 'element-ui';
import config from '@/config';
import token from '@/helper/token';
import router from '@/router';

const instance = url => {
    const instance = axios.create({
        baseURL: url || config.server.api,
        // withCredentials: true,
        timeout: 5000
    });

    let loadingInstancce = null;

    instance.interceptors.request.use(async (require) => {
        // 全屏遮罩
        loadingInstancce = Loading.service({
            fullscreen: true,
            spinner: 'el-icon-loading',
            text: '加载中'
        });

        let accessToken = '';

        try {
            accessToken = await token.get();
        } catch (e) {
            accessToken = e;
        }

        if (accessToken === 'error') {
            loadingInstancce.close();
            router.push({ path: '/login' });
        }

        require.headers.Authorization = `Bearer ${accessToken}`;
        return require;
    });

    instance.interceptors.response.use((response) => {
        loadingInstancce.close();
        const { data, config } = response;
        // console.log(response);
        if ((response.status === 200 || response.status === 201 || response.status === 204) && (config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
            Notification.success({
                title: '操作成功'
            });
        } else if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
            Notification.error({
                title: response.statusText
            });
        }
        return data;
    }, (error) => {
        return error;
    });

    return instance;
};

export default instance;
