const InitialState = {
    leftNavToggle: false,
    editDiaryId: null,
    editDialogToggle: false,
    currentEditDiary: null,
    currentDeleteDiary: null
};

export default function (state = InitialState, action) {
    switch (action.type) {
        case 'TOGGLE_LEFT_NAV':
            return Object.assign({}, state, { leftNavToggle: !state.leftNavToggle }); //InitialState
        case 'TOGGLE_DELETE_ALERT':
            var newState = Object.assign({}, state);
            newState.currentDeleteDiary = action.diary;
            return newState;
        case 'TOGGLE_EDIT_DIALOG':
            var newState = Object.assign({}, state);
            (state.editDiaryId == action.id) && (newState.editDiaryId = null);
            (state.editDiaryId != action.id) && (newState.editDiaryId = action.id);
            newState.currentEditDiary = newState.editDiaryId ? Object.assign({}, action.diary) : null;
            return newState;
        // case 'SELECT_CURRENT_EDIT_DIARY':
        //     var newState = Object.assign({}, state);
        //     newState.currentEditDiary = Object.assign({}, action.diary);
        //     return newState;
        case 'UPDATE_CURRENT_EDIT_DIARY':
            var newState = Object.assign({}, state);
            newState.currentEditDiary = Object.assign({}, newState.currentEditDiary, action.diary);
            // console.log(newState);
            return newState;
        default:
            return state;
    }
}
