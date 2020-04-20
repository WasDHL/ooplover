import moment from 'moment';

import { Message } from './../../model';

import { STATE } from './../../const';

import { base64Encode } from './../../utils/common';

export const send = async function ({ content, receiveUserId, sendUserId }) {
    var messageModel = await appendMessage({ content, receiveUserId, sendUserId });

    return messageModel;
}

export const pullReceive = async function ({ receiveUserId, sendUserId, numLimit }) {
    var conditions = { status: STATE.NORMAL };
    // receiveUserId && (conditions.receiveUserId = receiveUserId);
    // sendUserId && (conditions.sendUserId = sendUserId);

    var messages = await Message.findAll({ where: conditions, order: [[ 'createTime', 'DESC' ]], limit: numLimit || 10, raw: true });
    return (messages || []).map(message => Object.assign({}, message, {
        content: base64Encode(message.content)
    }));
}

export const appendMessage = async function ({ content, receiveUserId, sendUserId }) {
    return await Message.create({ content, receiveUserId, sendUserId, createTime: moment().unix(), status: STATE.NORMAL }, { raw: true });
}

export const searchMessages = async function ({ receiveUserId, sendUserId }) {
    return await Message.findAll({ where: { receiveUserId, sendUserId, status: STATE.NORMAL }, raw: true });
}

export const readedMessage = async function (ids) {
    ids && typeof ids == 'string' && (ids = [ids]);
    if (ids && ids.length > 0) {
        return await Message.update({ readed: 1, readTime: moment().unix() }, { where: { id: { '$in': ids } }, raw: true });
    }
}

