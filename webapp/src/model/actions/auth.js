import { get, getAction, post, postAction } from './api';
import asyncActionStateTracker from './../../utils/asyncActionStateTracker';

const actionMap = {
    login: function ({ name, password }) {
        return async function (dispatch) {
            var response = await dispatch(postAction('/auth/login', { name, password }));

            response.success && dispatch({ type: 'LOGIN_SUCCESS' });
            !response.success && dispatch({ type: 'LOGIN_FAIL', errorMessage: response.status || { } });
            return response.data;
        }
    },
    register: function ({ name, password }) {
        return async function (dispatch) {
            var response = await dispatch(postAction('/auth/create', { name, password }));

            response.success && dispatch({ type: 'LOGIN_SUCCESS' });
            !response.success && dispatch({ type: 'LOGIN_FAIL', errorMessage: response.status || { } });

            return response.data;
        }
    }
};

export const login = asyncActionStateTracker(actionMap['login'], 'isFetchingLogin');
export const register = asyncActionStateTracker(actionMap['register'], 'isFetchingLogin');
