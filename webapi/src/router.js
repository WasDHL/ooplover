'use strict';
import Router from 'koa-router';
import auth from './modules/auth/router';
import message from './modules/message/router';

const apiRouter = new Router({ prefix: '/api' });

export default function (app) {
    apiRouter.use(auth.routes());
    apiRouter.use(message.routes());

    app.use(apiRouter.routes());
}