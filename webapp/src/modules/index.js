import React, { Componnet } from 'react';
// import { Router, hashHistory } from 'react-router';
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom';

import Home from './home';
import Login from './login';
import About from './about';
//  <Router history={hashHistory} routes={routes} />

export default function RootModule (props) {
    return (
        <div id="J_appRouterContainer">
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </Switch>
            </HashRouter>
        </div>
    );
}
