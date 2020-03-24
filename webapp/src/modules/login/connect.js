import { connect } from 'react-redux';
import { login, register } from './../../model/actions/auth';

export const connectAuth = connect(
    ({ authState }) => ({
        token: authState.token, loginSuccess: authState.loginSuccess,
        loginFail: authState.loginFail, errorMessage: authState.errorMessage
    }),
    (dispatch) => ({
        login: ({ name, password }) => dispatch(login({ name, password })),
        register: ({ name, password }) => dispatch(register({ name, password }))
    })
)
