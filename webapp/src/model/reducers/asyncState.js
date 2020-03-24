const InitialState = { };

export default function (state = InitialState, action) {
    switch (action.type) {
        case 'FETCHING_START':
            return Object.assign({}, state, { [action.fetchingKey]: true }); //InitialState
        case 'FETCHING_STOP':
            return Object.assign({}, state, { [action.fetchingKey]: false });
        default:
            return state;
    }
}
