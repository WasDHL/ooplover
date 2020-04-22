import { connect } from 'react-redux';
import { expandDream, collapseDream, toggleDomWindowVisible } from '../model/actions/hideModel';

export const connectAppState = connect((state) => {
    return {
        hideModelVisible: state.viewState.hideModelVisible,
        // domWindowVisible: state.viewState.domWindowVisible
    }
}, null);

export const connectAppDispatch = connect(null, (dispatch) => ({
    expandDream: () => dispatch(expandDream()),
    collapseDream: () => dispatch(collapseDream()),
    toggleDomWindowVisible: visible => dispatch(toggleDomWindowVisible(visible))
}));