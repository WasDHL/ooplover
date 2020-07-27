import { get, getAction, post, postAction } from './api';
import asyncActionStateTracker from './../../utils/asyncActionStateTracker';
import Base64 from './../../utils/base64';

const actionMap = {
    pullReceiveMessageList: function () {
        return async function (dispatch, getState) {
            var state = getState();
            var messageNumLimit = state && state.messageState && state.messageState.messageNumLimit;
            // var response = await get('/diary/list');
            var response = await dispatch(postAction('/message/pullReceive', { numLimit: messageNumLimit || 10 }));
            response.success && dispatch({ type: 'FETCHED_MESSAGELIST', messageList: (response.data || []).map(message => Object.assign({}, message, {
                content: Base64.decode(message.content || '')
            })) });
            return response.data;
        }
    },
    sendMessage: function (message) {
        return async function (dispatch, getState) {
            var state = getState();
            var dataState = state.dataState || {};
            var userId = dataState.userInfo && dataState.userInfo.id;

            var response = await dispatch(postAction('/message/send', { content: message, sendUserId: userId }));
            // response.success && dispatch(pullReceiveMessageList());
            return response.data;
        }
    },
    // readedMessages: function () {
    //     return async function (dispatch, getState) {
    //         var state = getState();
    //         var messageList = state && state.messageState && state.messageState.messageList;
    //         var messageIds = (messageList || []).map(message => message.id);

    //         var response = await dispatch(postAction('/message/readed', { messageIds: messageIds }));

    //         return response.data;
    //     }
    // }
}

export const pullReceiveMessageList = asyncActionStateTracker(actionMap['pullReceiveMessageList'], "isPullingReceiveMessageList");

export const startHBPull = function () {
    return function (dispatch) {
        // setInterval(function () {
        //     dispatch(actionMap['pullReceiveMessageList']());
        // }, 10000);
    }
}

export const updateMessageNumLimit = function (numLimit) {
    return function (dispatch, getState) {
        var state = getState();
        var messageNumLimit = state && state.messageState && state.messageState.messageNumLimit;

        numLimit = numLimit || (messageNumLimit + 10);

        dispatch({ type: 'UPDATE_MSG_NUM_LIMIT', messageNumLimit: numLimit });
        dispatch(actionMap['pullReceiveMessageList']());
    }
};

export const readedMessages = function () {
    return async function (dispatch, getState) {
        var state = getState();
        // debugger;
        var userInfo = state.dataState.userInfo;
        var userId = userInfo && userInfo.id;

        var messageList = state && state.messageState && state.messageState.messageList;
        var messageIds = (messageList || [])
            .filter(message => (message.sendUserId !== userId)) // 发件人不是当前登录人
            .filter(message => !message.readed).map(message => message.id);

        console.log('MK MSG READED:');
        console.log(messageIds);

        // return messageIds;
        var responseData = null
        if (messageIds && messageIds.length > 0) {
            var response = await dispatch(postAction('/message/readed', { messageIds: messageIds }));
            responseData = response.data;
        }

        return responseData;
    }
};

export const checkMessageReadedCondition = function () {
    return async function (dispatch, getState) {
        var state = getState();
        var domWindowVisible = !!state.viewState.domWindowVisible;
        var hideModelVisible = state.viewState.hideModelVisible == 'expanded';
        var messageVisible = domWindowVisible && hideModelVisible;

        if (messageVisible) { return dispatch(readedMessages()); }
    }
}

export const sendMessage = asyncActionStateTracker(actionMap['sendMessage'], "isSendingMessage");
