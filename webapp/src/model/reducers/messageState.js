const InitialState = {
    userMap: [],
    messageList: [],
    messageNumLimit: 10,
    hasDidNotReadMessage: false
};

export default function (state = InitialState, action) {
    switch (action.type) {
        case 'UPDATE_MSG_NUM_LIMIT':
            return Object.assign({}, state, { messageNumLimit: action.messageNumLimit });
        case 'FETCHED_MESSAGELIST':
            var messageList = action.messageList || [];
            messageList = messageList.sort(function (l, r) { return l.createTime > r.createTime ? 1 : -1; })
            return Object.assign({}, state, { messageList: messageList });
        case 'UPDATE_DIDNOT_READED_STATUS': 
            return Object.assign({}, state, { hasDidNotReadMessage: !!action.hasDidNotReadMessage });
        case 'FETCHED_USERS':
            var userMap = {};
            (action.users || []).map(user => (userMap[user.id] = user));
            return Object.assign({}, state, { userMap: userMap });
        default:
            return state;
    }
}
