import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import viewState from './reducers/viewState';
import dataState from './reducers/dataState';
import asyncState from './reducers/asyncState';
import authState from './reducers/authState';
import messageState from './reducers/messageState';

export default createStore(combineReducers({
    viewState, dataState, asyncState, authState, messageState
}), applyMiddleware(thunk));
