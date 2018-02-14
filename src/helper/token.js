import $ from 'jquery';
import api from '@/api/website/login';

const save = params => {
    const { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken, token_type: tokenType } = params;
    $.cookie('accessToken', accessToken, { expires: expiresIn / 86400 });
    localStorage.refreshToken = refreshToken;
    localStorage.tokenType = tokenType;
};

const get = () => new Promise((resolve, reject) => {
    let accessToken = $.cookie('accessToken');

    if (!accessToken) {
        api.refresh({
            'grant_type': 'refresh_token',
            'refresh_token': localStorage.refreshToken
        }).then(res => {
            save(res.data);
            resolve(res.data.access_token);
        }).catch(v => reject(v));

        // 不加会报错
        reject('error');
    } else {
        resolve(accessToken);
    }
});

export default {
    save,
    get
};
