import { get, getAction, post, postAction } from './api';
import asyncActionStateTracker from './../../utils/asyncActionStateTracker';

// var get = function () {
//     console.log(arguments);

//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 400);
//     });
// }

function fetchedUserInfo (userInfo) {
    return function (dispatch) {
        dispatch({ type: 'FETCHED_USERINFO', userInfo });
    };
}

export function fetchUserInfoAction () {
    return async function (dispatch) {
        var response = await dispatch(getAction('/auth/info'));
        dispatch({ type: 'FETCHED_USERINFO', userInfo: response.data || {} });
        return response;
    };
}

export const fetchUserInfo = asyncActionStateTracker(fetchUserInfoAction, "isFetchingUserInfo");

export const fetchUsers = asyncActionStateTracker(function () {
    return async function (dispatch) {
        var response = await dispatch(getAction('/auth/users'));
        dispatch({ type: 'FETCHED_USERS', users: response.data || [] });
        return response;
    }
}, 'isFetchingUsers');

