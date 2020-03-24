import { connect } from 'react-redux';
import { fetchDiary, submitDiary, fetchDiaryList, deleteDiary, fetchDiaryDetail } from './../../model/actions/diary';
import { pullReceiveMessageList, sendMessage } from './../../model/actions/message';

export const connectViewState = connect(
    ({ viewState, dataState }) => ({
        leftNavToggle: viewState.leftNavToggle,
        editDiaryId: viewState.editDiaryId,
        userInfo: dataState.userInfo,
        currentEditDiary: dataState.diaryDetail, // viewState.currentEditDiary,
        currentDeleteDiary: viewState.currentDeleteDiary
    }),
    (dispatch) => ({
        toggleLeftNav: () => dispatch({ type: 'TOGGLE_LEFT_NAV' }),
        fetchDiaryDetail: (id) => dispatch(fetchDiaryDetail(id)),
        toggleEditDialog: (id, diary) => {
            // debugger;
            // dispatch(fetchDiaryDetail(id)).then(response => dispatch({ type: 'TOGGLE_EDIT_DIALOG', id, diary }))
            response => dispatch({ type: 'TOGGLE_EDIT_DIALOG', id, diary });
        },
        updateEditDiary: (diary) => dispatch({ type: 'UPDATE_CURRENT_EDIT_DIARY', diary }),
        submit: (diary) => dispatch(submitDiary(diary))
            .then(response => dispatch({ type: 'TOGGLE_EDIT_DIALOG', id: null, diary: null }))
            .then(response => dispatch(fetchDiaryList())),
        toggleDeleteAlert: diary => dispatch({ type: 'TOGGLE_DELETE_ALERT', diary }),
        delete: (id) => dispatch(deleteDiary(id))
            .then(response => dispatch({ type: 'TOGGLE_DELETE_ALERT', diary: null }))
            .then(response => dispatch(fetchDiaryList())),
        sendMessage: message => dispatch(sendMessage(message))
    })
);

export const connectDataState = connect(
    ({ dataState, messageState }) => ({
        diaryList: dataState.diaryList,
        userMap: messageState.userMap,
        messageList: messageState.messageList
    }),
    dispatch => ({
    })
);
