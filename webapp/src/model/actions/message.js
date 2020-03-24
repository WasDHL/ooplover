import { get, getAction, post, postAction } from './api';
import asyncActionStateTracker from './../../utils/asyncActionStateTracker';

const actionMap = {
    pullReceiveMessageList: function () {
        return async function (dispatch) {
            // var response = await get('/diary/list');
            var response = await dispatch(postAction('/message/pullReceive'));
            response.success && dispatch({ type: 'FETCHED_MESSAGELIST', messageList: response.data || [] });
            return response.data;
        }
    },
    sendMessage: function (message) {
        return async function (dispatch) {
            var response = await dispatch(postAction('/message/send', { content: message }));
            response.success && dispatch(pullReceiveMessageList());
            return response.data;
        }
    }
}

export const pullReceiveMessageList = asyncActionStateTracker(actionMap['pullReceiveMessageList'], "isPullingReceiveMessageList");

export const startHBPull = function () {
    return function (dispatch) {
        setInterval(function () {
            dispatch(actionMap['pullReceiveMessageList']());
        }, 2000);
    }
}

export const sendMessage = asyncActionStateTracker(actionMap['sendMessage'], "isSendingMessage")