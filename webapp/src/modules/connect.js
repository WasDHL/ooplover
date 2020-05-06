import { connect } from 'react-redux';
import { tryExpandDream, expandDream, collapseDream, toggleDomWindowVisible } from '../model/actions/hideModel';

export const connectAppState = connect((state) => {
    return {
        hideModelVisible: state.viewState.hideModelVisible,
        // domWindowVisible: state.viewState.domWindowVisible
    }
}, null);

export const connectAppDispatch = connect(null, (dispatch) => ({
    expandDream: (tryOpen, btnKey) => dispatch(tryExpandDream(tryOpen, btnKey)),
    collapseDream: () => dispatch(collapseDream()),
    toggleDomWindowVisible: visible => dispatch(toggleDomWindowVisible(visible))
}));