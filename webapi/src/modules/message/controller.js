import config from './../../config';
import * as service from './service';
import { getAuthId } from './../../utils/auth';
import { bodyWrapper } from './../../utils/wrapper';

import { notifyClient } from './../../socket';


export let send = async ctx => {
    let data = null;
    let error = null;

    try {
        let { content, receiveUserId, sendUserId } = ctx.request.body;
        sendUserId = sendUserId || getAuthId(ctx);

        data = await service.send({ content, receiveUserId, sendUserId });

        notifyClient('newMessageSended', { data })
    } catch (ex) {
        return ctx.body = bodyWrapper(error, data);
    }

    return ctx.body = bodyWrapper(error, data);
}

export let readed = async ctx => {
    let data = null;
    let error = null;

    try {
        let { messageIds } = ctx.request.body;
        messageIds = messageIds || [];

        data = await service.readedMessage(messageIds);

        notifyClient('newMessageSended', { data })
    } catch (ex) {
        return ctx.body = bodyWrapper(error, data);
    }

    return ctx.body = bodyWrapper(error, data);
}

export let pullReceive = async ctx => {
    let data = null;
    let error = null;

    try {
        let { numLimit, receiveUserId, sendUserId } = ctx.request.body;
        receiveUserId = receiveUserId || getAuthId(ctx);

        data = await service.pullReceive({ numLimit, receiveUserId, sendUserId });
    } catch (ex) {
        return ctx.body = bodyWrapper(error, data);
    }

    return ctx.body = bodyWrapper(error, data);
}


