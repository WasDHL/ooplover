const InitialState = {
    leftNavToggle: false,
    editDiaryId: null,
    editDialogToggle: false,
    currentEditDiary: null,
    currentDeleteDiary: null,
    hideModelVisible: window.localStorage.getItem('DREAM_STATUS') === 'expanded' ? 'expanded' : 'collapsed',
    domWindowVisible: true // 当前窗口是否可见
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
        case 'TOGGLE_HIDE_MODEL':
            var newState = Object.assign({}, state);
            var visible = action.visible;
            newState.hideModelVisible = visible;
            window.localStorage.setItem('DREAM_STATUS', newState.hideModelVisible);
            return newState;
        case 'TOGGLE_DOM_WINDOW_VISIBLE': 
            var newState = Object.assign({}, state);
            var visible = !!action.visible;
            newState.domWindowVisible = visible;
            return newState;
        default:
            return state;
    }
}
