import React, { Component } from 'react';
import moment from 'moment';
import { DiaryViewer } from './../../widgets/editor';

const DiaryItem = function (props) {
    return (
        <div className="diary-item-wrap" key={props.id}>
            <div className="diary-item-header">
                <span className="diary-item-date v-m">{moment(props.createdAt || '2018-10-10').format('YYYY-MM-DD')}</span>
                <span className="diary-item-title v-m">{props.title}</span>
                <div className="opera-container">
                    <span className="btn view-btn" onClick={() => {
                        props.fetchDiaryDetail && props.fetchDiaryDetail(props.id);
                        props.toggleEditDialog && props.toggleEditDialog(props.id, { id: props.id, content: props.content, title: props.title });
                    }}>eDit</span>
                    <span className="btn delete-btn" onClick={() => props.toggleDeleteAlert && props.toggleDeleteAlert({ id: props.id, content: props.content, title: props.title })}>dElete</span>
                </div>
            </div>
            <div className="diary-item-content">
                <DiaryViewer raw={props.content} />
            </div>
        </div>
    );
}

import { connectViewState } from './connect';

export default connectViewState(DiaryItem);
