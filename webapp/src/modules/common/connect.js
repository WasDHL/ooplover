import { connect } from 'react-redux';

import { fetchUserInfo, fetchUsers } from './../../model/actions/userInfo';
import { fetchDiaryList } from './../../model/actions/diary';
import { pullReceiveMessageList, sendMessage, startHBPull } from './../../model/actions/message';

export const connectInitState = connect(
    ({ viewState }) => ({

    }),
    dispatch => ({
        initUserInfo: () => { var result = dispatch(fetchUserInfo()); console.log(result); result.then(() => console.log('DISPTCH PROMISE THEN')); return result; },
        // initDiaryList: () => dispatch(fetchDiaryList())
        fetchUsers: () => dispatch(fetchUsers()),
        pullReceiveMessageList: () => dispatch(pullReceiveMessageList()),
        startHBPull: () => dispatch(startHBPull())
    })
);

export const connectAsyncState = connect(
    ({ asyncState }) => asyncState
);
