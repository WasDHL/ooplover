import 'assets/theme/default/index.scss';
import './utils/promise';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import Root from './modules';
import Store from './model';
// import routers from './routers';

// ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('root'));

ReactDOM.render(<Provider store={Store}><Root /></Provider>, document.getElementById('root'));
