import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import ImgTable from './imgTable'
import ImgControll from './imgControll'
import { Spin } from 'antd';
class ImgList extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        const state = this.state;
        return (
            <Spin wrapperClassName='content' spinning={this.props.addSong.imgList.imgLoading}>
                <div style={{ margin: 5, padding: 6, background: '#fff' }}>
                    <ImgControll />
                    <ImgTable />
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
export default connect(mapStateToProps)(ImgList);