import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import MusicTable from './musicTable'
import MusicControll from './musicControll'
import { Spin } from 'antd';
class MusicList extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        const state = this.state;
        return (
            <Spin wrapperClassName='content' spinning={this.props.addSong.musicList.musicLoading}>
                <div style={{ margin: 5, padding: 6, background: '#fff' }}>
                    <MusicControll />
                    <MusicTable />
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
export default connect(mapStateToProps)(MusicList);