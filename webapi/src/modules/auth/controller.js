import config from './../../config';
import * as service from './service';
import { bodyWrapper } from './../../utils/wrapper';
import { getAuthId } from './../../utils/auth';

export let login = async ctx => {
    let data = null;
    let error = null;
    try {
        let { name, password } = ctx.request.body;

        let user = await service.privateQuery({ name: name });
        if (!user) {
            throw { code: 'E330', message: '非法ID' };
        }

        if (!(await service.verifyPassword(password, user.passwordHash))) {
            throw { code: 'E331', message: '密码错误' };
        }

        let token = await service.createUserToken(user.id);

        // let jwtToken = jwt.sign({ name, password }, secret, { expiresIn: '1h' });
        data = {
            token: token
        };

        ctx.cookies.set(config.jwtCookieName, token, {
            path: '/',
            maxAge: 100 * 50 * 1000, // 50分钟有效期
            httpOnly: false,
            overwrite: false
        });

        // data = await service.login({ name, password });
    } catch (ex) {
        return ctx.body = bodyWrapper(ex, data);
    }
    return ctx.body = bodyWrapper(error, data);
}

export let create = async ctx => {
    let data = null;
    let error = null;
    try {
        let { name, password } = ctx.request.body;
        let existUser = await service.query({ name: name });
        if (existUser) {
            throw { code: 'E332', message: '用户名已存在' };
        }

        data = await service.create({ name, password });

        console.log(data);

        return login(ctx);
    } catch (ex) {
        return ctx.body = bodyWrapper(ex, data);
    }
}

export let info = async ctx => {
    let data = null;
    let error = null;

    try {
        let query = ctx.request.query;
        let { id } = query;
        id = id || getAuthId(ctx);

        data = await service.query({ id });
    } catch (ex) {
        return ctx.body = bodyWrapper(error, data);
    }

    return ctx.body = bodyWrapper(error, data);
}

export let users = async ctx => {
    let data = null;
    let error = null;

    try {
        data = await service.users();
    } catch (ex) {
        return ctx.body = bodyWrapper(error, data);
    }

    return ctx.body = bodyWrapper(error, data);
}
