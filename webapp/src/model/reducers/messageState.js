const InitialState = {
    userMap: [],
    messageList: []
};

export default function (state = InitialState, action) {
    switch (action.type) {
        case 'FETCHED_MESSAGELIST':
            var messageList = action.messageList || [];
            messageList = messageList.sort(function (l, r) { return l.createTime > r.createTime ? 1 : -1; })
            return Object.assign({}, state, { messageList: messageList });
        case 'FETCHED_USERS': 
            var userMap = {};
            (action.users || []).map(user => (userMap[user.id] = user));
            return Object.assign({}, state, { userMap: userMap });
        default:
            return state;
    }
}
