import React, { Component } from 'react';

import { Modal } from './../../widgets/modal';
import InitialTrigger from './../../components/initialTrigger';

import LeftNav from './leftNav';
// import CreateBtn from './createBtn';
// import DiaryItem from './diaryItem';
// import EditDialog from './editDialog';
// import DeleteAlert from './deleteAlert';
import MessageItem from './messageItem';

const bannerImg = require('./../../assets/theme/default/images/banner.jpg');
const adimn1Avator = require('./../../assets/avators/admin1.jpg');
const adimn2Avator = require('./../../assets/avators/admin2.jpg');

import { connectViewState, connectDataState } from './connect';
import SenderBox from './senderBox';

const HomeBodyComponent = function (props) {
    return (
        <div className="home-page">
            <div style={{ padding: "30px 20px" }}>
                <i className="fa fa-bars icon" aria-hidden="true" style={{ fontSize: "20px", color: "#a0a0a0" }} onClick={() => props.toggleLeftNav && props.toggleLeftNav()}></i>
                <span style={{ position: 'absolute', right: '40px', top: '35px', color: '#a0a0a0' }}>晚安说</span>
            </div>
            <Modal active={props.leftNavToggle}>
                <LeftNav />
            </Modal>

            <div className="body-wrap">
                <div className="body-row">
                    <div className="banner-wrap v-m">
                        <div className="banner-title" onClick={() => props.initData && props.initData()}>OOP Lover</div>
                        <p className="">面向对象面相君，不负代码不负卿</p>
                    </div>
                    <img className="banner-avator v-m" src={props.userInfo && props.userInfo.id == 1 ? adimn1Avator : adimn2Avator}></img>

                </div>

                <div className="body-row">
                    <div>
                    {
                        props.messageList && props.messageList.map((message, idx) => (
                            <div key={idx}>
                                <MessageItem message={message} user={props.userMap && props.userMap[message.sendUserId]}></MessageItem>
                            </div>
                        ))
                    }   
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <SenderBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

const ConnectedHomeBodyComponent = connectDataState(connectViewState(HomeBodyComponent));

import { connectInitState, connectAsyncState } from './../common/connect';

export default connectAsyncState(connectInitState(props => {
    var isLoading = 
        // props && props.isPullingReceiveMessageList !== false || 
        props && props.isFetchingUsers !== false;
    return (
        <div>
            <InitialTrigger initialAction={() => props.initUserInfo && props.initUserInfo()} />
            <InitialTrigger initialAction={() => props.pullReceiveMessageList && props.pullReceiveMessageList()} />
            <InitialTrigger initialAction={() => props.startHBPull && props.startHBPull()} />
            <InitialTrigger initialAction={() => props.fetchUsers && props.fetchUsers()} />
            {/* <InitialTrigger initialAction={() => props.initDiaryList && props.initDiaryList()} /> */}

            { isLoading && <div className="loading">LOADING......</div> }
            { !isLoading && <ConnectedHomeBodyComponent /> }
        </div>
    );
}));

// export default connectViewState(HomeBodyComponent);
