'use strict';
import http from 'http';
import Koa from 'koa';
import convert from 'koa-convert';
import error from 'koa-error';
import config from './config';
import router from './router';

import koaBody from 'koa-body';

import jwtKoa from 'koa-jwt';
import { decodeJWT } from './utils/auth';

// import socket from 'socket.io';

import { connect as socketIOConnect } from './socket';

// const secret = 'QwjoiwjefEjuwdhfHhHPPOWEIsdfjwIEnLEIfeoilDILFJEUhkalidjoUHyewihfYGHjYUhkK';
const app = new Koa();


app.use(
	jwtKoa({ secret: config.secret, cookie: config.jwtCookieName })
	.unless({ path: [/^\/api\/auth\/login/, /^\/api\/auth\/create/, /^\/api\/message\/send/] })
);

//body解析
app.use(convert(koaBody({
	formidable: {
        uploadDir: config.uploadDir
    },
	multipart: true
})));


// app.use(convert(koaBody({
//     formidable: {
//         uploadDir: config.uploadDir
//     },
//     multipart: true
// })));

//禁止缓存
app.use(function(ctx, next) {
	ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
	ctx.set('Pragma', 'no-cache'); // HTTP 1.0.
	ctx.set('Expires', '0'); // Proxies.
	return next();
});

app.context.authInfo = {};

app.use(async function (ctx, next) {
	let jwtCookie = ctx.cookies.get(config.jwtCookieName);
	let authInfo = null;
	jwtCookie && (authInfo = await decodeJWT(jwtCookie));
	authInfo && (ctx.authInfo = { id: authInfo.id, name: authInfo.name });
	
	return next();
});


//路由
router(app);

// app.listen(config.port, function() {
// 	console.info('listen on', config.port);
// });
const server = http.createServer(app.callback());

//挂载socket
// const io = socket(server);

// global && (global['socketIoInstance'] = io);

socketIOConnect(server);

// io.on('connection', client => {
// 	console.log('connectioned');
// });

server.listen(config.port, function() {
	console.info('listen on', config.port);
});


