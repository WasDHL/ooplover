import React, { Component } from 'react';

import MessageItem from './messageItem';

import { messageUpdateConnectDispatch } from './connect';

export default messageUpdateConnectDispatch(class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.messageList = props.messageList || [];
        this.state.userMap = props.userMap || {};

        console.log('MMMMM SSSS GGGG Constructor');
    }

    componentWillReceiveProps (newProps) {
        console.log('MMMMM SSSS GGGG ComponentWillReceiveProps');
        console.log(newProps);
        var oldMessageList = this.state.messageList || [];
        var newMessageList = newProps.messageList || [];
        var checkMessageReaded = this.props.checkMessageReaded;


        if ((newMessageList.length !== oldMessageList.length) || this.checkMessageListChanged(newMessageList, oldMessageList)) {
            // debugger;
            this.state.messageList = newMessageList;
            this.setState({ messageList: this.state.messageList }, function () {
                setTimeout(function () {
                    checkMessageReaded && typeof checkMessageReaded == 'function' && checkMessageReaded();
                }, 2000);
            });
        }
    }

    checkMessageListChanged (newList, oldList) {
        var newStr = newList.map(m => ({ id: m.id, content: m.content, readed: m.readed }));
        var oldStr = oldList.map(m => ({ id: m.id, content: m.content, readed: m.readed }));

        return newStr !== oldStr;
    }

    componentDidMount () {
        var checkMessageReaded = this.props.checkMessageReaded;
        setTimeout(function () {
            checkMessageReaded && typeof checkMessageReaded == 'function' && checkMessageReaded();
        }, 2000);
    }

    render () {
        return (
            <div>
                    {
                        this.state.messageList && this.state.messageList.map((message, idx) => (
                            <div key={idx}>
                                <MessageItem message={message} user={this.state.userMap && this.state.userMap[message.sendUserId]}></MessageItem>
                            </div>
                        ))
                    }
            </div>
        );
    }
});