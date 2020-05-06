import { connect } from 'react-redux';

// import {  } from './../../model/actions/message';

export const connectStatus = connect(({ messageState }) => ({
    hasDidNotReadMessage: messageState && messageState.hasDidNotReadMessage
}));