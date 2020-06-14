import React, { Componnet } from 'react';
// import { Router, hashHistory } from 'react-router';
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom';

import SLAPage from './sla';
import Home from './home';
import Login from './login';
import About from './about';
//  <Router history={hashHistory} routes={routes} />

import { bindWindowVisibleChange } from './../utils/domEventTrigger';

import { connectAppState, connectAppDispatch } from './connect';

window.GetDreamStatus = function () {
    return window.localStorage.getItem('DREAM_STATUS');
}

window.expandStepCount = 0;
window.refreshFlag = null;

window.ExpandDream = function () {
    window.expandStepCount = window.expandStepCount + 1;

    if (window.expandStepCount > 2) {
        window.localStorage.setItem('DREAM_STATUS', 'expanded');

        document.getElementById('J_appHideModel').style.display = 'none';
        document.getElementById('J_appCollapseBtn').style.display = 'block';
        window.expandStepCount = 0;
    }

    window.clearTimeout(window.refreshFlag)
    window.refreshFlag = setTimeout(function () {
        window.expandStepCount = 0;
    }, 1000);
};

window.CollapseDream = function () {
    window.localStorage.setItem('DREAM_STATUS', 'collapsed');

    document.getElementById('J_appHideModel').style.display = 'block';
    document.getElementById('J_appCollapseBtn').style.display = 'none';
};

function RootModule (props) {
    // var expand = function () { window.ExpandDream(); }
    // var collapse = function () { window.CollapseDream(); }
    // var status = window.GetDreamStatus();

    var expand = function () { props.expandDream && props.expandDream(); }
    var collapse = function () {
        props.collapseDream && props.collapseDream();
    }
    var status = props.hideModelVisible;

    return (
        <div id="J_appRouterContainer">
            { status !== 'collapsed' && (<HashRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </Switch>
            </HashRouter>)}

            <span id="J_appCollapseBtn" className="collapse-btn" style={{ 'display': status !== 'collapsed' ? 'block' : 'none' }} onClick={collapse}>Collapse BTN</span>
            <div id="J_appHideModel" className="hide-model" style={{ 'display': status === 'collapsed' ? 'block' : 'none' }}>
                <SLAPage expand={expand} collapse={collapse}></SLAPage>
            </div>
        </div>
    );
}

const ConnectedRootModel = connectAppDispatch(connectAppState(RootModule));

export default connectAppDispatch(props => {
    bindWindowVisibleChange(function (isHide) {
        console.log('VISIBLE CHANGED: ' + isHide);
        props && props.toggleDomWindowVisible && typeof props.toggleDomWindowVisible == 'function' && props.toggleDomWindowVisible(!isHide);
    });

    return <ConnectedRootModel />
})
