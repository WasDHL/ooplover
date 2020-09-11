import React from 'react';
import moment from 'moment';

const adimn1Avator = require('./../../assets/avators/admin1.jpg');
const adimn2Avator = require('./../../assets/avators/admin2.jpg');

export default function MessageItem (props) {
    var message = props.message;
    var user = props.user;
    return (
        <div className="message-item theme-font">
            <span className="unread-cicle theme-font" style={{display: message.readed ? 'none' : 'none'}}>
            </span>
            <div className="message-avator">
                <img src={user && user.id == 1 ? adimn1Avator : adimn2Avator} />
            </div>
            <div className="message-header theme-font">
                <span className="send-user">{user.name}</span>  <span className="send-date">{moment(message.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            <div className="message-content theme-font">
                {message.content}

                <span className="readed-status" style={{display: 'none'}}>
                    {message.readed ? '已读' : '未读'}
                </span>
            </div>
        </div>
    );
}
