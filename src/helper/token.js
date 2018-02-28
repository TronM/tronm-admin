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
            // Check refreshToken before sending request to avoid wrong request
            const { refreshToken } = localStorage;
            if (!refreshToken) {
                // TODO: make sure whether here should return a string error?
                return 'error';
            }

            const res = await api.refresh({
                'grant_type': 'refresh_token',
                'refresh_token': refreshToken
            });

            accessToken = res.access_token;
            save(res);
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
