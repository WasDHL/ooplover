import { connect } from 'react-redux';

// import {  } from './../../model/actions/message';
import { tryExpandDream, expandDream, collapseDream, toggleDomWindowVisible } from '../../model/actions/hideModel';


export const connectDispatch = connect(null, (dispatch) => ({
    expand: (tryOpen, btnKey) => dispatch(tryExpandDream(tryOpen, btnKey))
}));

export const connectStatus = connect(({ messageState }) => ({
    hasDidNotReadMessage: messageState && messageState.hasDidNotReadMessage
}));
