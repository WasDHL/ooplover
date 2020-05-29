import React from 'react';

const adimn1Avator = require('./../../assets/avators/admin1.jpg');
const adimn2Avator = require('./../../assets/avators/admin2.jpg');

const LeftNavComponent = function (props) {
    // debugger;
    return (
        <div className="left-nav">
            <div className="banner" style={{padding: "40px 10px"}}>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <div className="avator-wrap v-m"><img src={props.userInfo && props.userInfo.id == 1 ? adimn1Avator : adimn2Avator} /></div>
                    <div className="user-name v-m theme-font">{props.userInfo && props.userInfo.name}</div>
                    <i className="fa fa-bars icon" aria-hidden="true"
                        style={{ position: "absolute", fontSize: "18px", height: "18px", right: "10px", top: "50%", marginTop: "-9px", color: "#a0a0a0" }}
                        onClick={() => props.toggleLeftNav && props.toggleLeftNav()}
                    >
                    </i>
                </div>
                <div style={{ position: "relative", marginBottom: "10px" }}>
                    <span className="theme-font">晚安说</span>
                    <i className="fa fa-ellipsis-h icon" aria-hidden="true" style={{ position: "absolute", fontSize: "18px", height: "18px", right: "10px", top: "50%", marginTop: "-9px", color: "#a0a0a0" }}></i>
                </div>
                <div>
                    <div className="theme-font" style={{ marginBottom: "10px", fontSize: "13px" }}><span className="v-m" style={{width: '70px'}}>签名： </span>你是我的源代码</div>
                    <div style={{ marginBottom: "10px", fontSize: "13px" }}><span className="v-m" style={{width: '70px'}}></span></div>
                </div>
            </div>
        </div>
    );
}

import { connectViewState } from './connect';

export default connectViewState(LeftNavComponent);
