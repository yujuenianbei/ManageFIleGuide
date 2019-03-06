import React from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';
import './play.less';
import _ from 'lodash';
import { Menu, Dropdown, Button, Slider, Icon } from 'antd';


class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.songListClose = this.songListClose.bind(this);
    this.songChange = this.songChange.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    console.log(nextProps, this.props)
  }

  // toggle 播放列表
  songListClose = () => {
    this.props.onSongListClose(!this.props.setList.music.songListShow);
  }
  // 切歌
  songChange = (e, data) => {
    this.props.onChangeSongPlayNow({
      songId: data.sid,
      src: data.src,
      songImg: data.img,
      songName: data.name,
      songAuthor: data.author
    });
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.setList !== this.props.setList) {
      return true
    } else {
      return false
    }
  }
  render() {
    return (
      <div className="songListDetail" style={{ bottom: this.props.setList.music.songListShow ? "52px" : "-252px" }}>
        <div className="songListDetailTitle">
          歌曲列表
          <span className='songListTitleClose' onClick={this.songListClose}>
            <Icon type="close" />
          </span>
        </div>
        <div className='songListDetailMenu'>
          <ul>
            {this.props.setList.music.data.map((item, index) => {
              return <li className={'songListLi ' + index} key={index.toString()} onDoubleClick={(e) => { this.songChange(e, item) }} ><div className='playNow'><Icon type={this.props.setList.music.playstate ? 'caret-right' : 'pause'} style={{ opacity: this.props.setList.music.songId === item.sid ? 1 : 0 }} /></div><div className='songName'>{item.name}</div><div className='songSinger'>{item.author}</div><div className='songTime'>{item.time}</div></li>;
            })}
          </ul>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    setList: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetList: (data) => {
      dispatch(Actions.setList(data));
    },
    onSongListClose: (bool) => {
      dispatch(Actions.songListToggle(bool));
    },
    onChangeSongPlayNow: (data) => {
      dispatch(Actions.songPlayNow(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);