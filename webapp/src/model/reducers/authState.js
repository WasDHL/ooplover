const InitialState = {
    userInfo: null,
    token: null,
    loginSuccess: false,
    loginFail: false,
    errorMessage: null
};

export default function (state = InitialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, { token: action.token, loginSuccess: true, messageData: {}, loginFail: false });
        case 'LOGIN_FAIL':
            return Object.assign({}, state, { errorMessage: action.errorMessage, loginFail: true, loginSuccess: false });
        default:
            return state;
    }
}
