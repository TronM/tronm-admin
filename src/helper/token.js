import $ from 'jquery';
import api from '@/api/website/login';

const save = params => {
    const { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken, token_type: tokenType } = params;
    $.cookie('accessToken', accessToken, { expires: expiresIn / 86400 });
    localStorage.refreshToken = refreshToken;
    localStorage.tokenType = tokenType;
};

const get = async() => {
    let accessToken = $.cookie('accessToken');

    if (!accessToken) {
        try {
            accessToken = await api.refresh({
                'grant_type': 'refresh_token',
                'refresh_token': localStorage.refreshToken
            });
        } catch (e) {
            return e;
        }
    }

    return accessToken;
};

export default {
    save,
    get
};
