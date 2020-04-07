import { get, getAction, post, postAction } from './api';
import asyncActionStateTracker from './../../utils/asyncActionStateTracker';

const actionMap = {
    pullReceiveMessageList: function () {
        return async function (dispatch, getState) {
            var state = getState();
            var messageNumLimit = state && state.messageState && state.messageState.messageNumLimit;
            // var response = await get('/diary/list');
            var response = await dispatch(postAction('/message/pullReceive', { numLimit: messageNumLimit || 10 }));
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

export const updateMessageNumLimit = function (numLimit) {
    return function (dispatch, getState) {
        var state = getState();
        var messageNumLimit = state && state.messageState && state.messageState.messageNumLimit;

        numLimit = numLimit || (messageNumLimit + 10);

        dispatch({ type: 'UPDATE_MSG_NUM_LIMIT', messageNumLimit: numLimit });
        dispatch(actionMap['pullReceiveMessageList']());
    }
};

export const sendMessage = asyncActionStateTracker(actionMap['sendMessage'], "isSendingMessage")
