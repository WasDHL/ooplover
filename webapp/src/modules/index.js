import React, { Componnet } from 'react';
// import { Router, hashHistory } from 'react-router';
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom';

import Home from './home';
import Login from './login';
import About from './about';
//  <Router history={hashHistory} routes={routes} />

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

export default function RootModule (props) {
    var expand = function () { window.ExpandDream(); }
    var collapse = function () { window.CollapseDream(); }
    var status = window.GetDreamStatus();

    return (
        <div id="J_appRouterContainer">
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </Switch>
            </HashRouter>

            <span id="J_appCollapseBtn" className="collapse-btn" style={{ 'display': status !== 'collapsed' ? 'block' : 'none' }} onClick={collapse}>Collapse BTN</span>
            <div id="J_appHideModel" className="hide-model" style={{ 'display': status === 'collapsed' ? 'block' : 'none' }}>
                <div>测试页面</div>
                <div>面向对象 爱好者</div>
                <div>作者: Harry</div>
                <div><span onClick={expand}>面向对象(Object Oriented,OO)</span>是 <b>软件开发方法</b>。面向对象的概念和应用已超越了程序设计和软件开发，扩展到如数据库系统、交互式界面、应用结构、应用平台、分布式系统、网络管理结构、CAD技术、人工智能等领域。面向对象是一种对<b>现实世界理解和抽象的方法</b>，是计算机编程技术 [1]  发展到一定阶段后的产物。<span>（ -- 来自百度百科 ）</span></div>
            </div>
        </div>
    );
}
