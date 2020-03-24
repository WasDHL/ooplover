import config from './../config';

const jwt = require('jsonwebtoken');

export const decodeJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        });
    });
};

export const getAuthInfo = (ctx) => {
    return ctx.authInfo || {};
}

export const getAuthId = (ctx) => {
    var info = getAuthInfo(ctx);
    return info && info.id;
}