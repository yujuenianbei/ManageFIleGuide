import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import VideoTable from './VideoTable'
import VideoControll from './VideoControll'
import { Spin } from 'antd';
class VideoList extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        const state = this.state;
        return (
            <Spin wrapperClassName='content' spinning={this.props.addSong.videoList.videoLoading}>
                <div style={{ margin: 5, padding: 6, background: '#fff' }}>
                    <VideoControll />
                    <VideoTable />
                </div>
            </Spin>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        addSong: state
    }
}
export default connect(mapStateToProps)(VideoList);