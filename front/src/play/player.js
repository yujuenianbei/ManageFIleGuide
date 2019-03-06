import React from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';
import './play.less';
import { Menu, Dropdown, Button, Slider, Icon } from 'antd';
import logo from '../static/xuezhiqian.jpg';


const iconColor = '#001529'
const like = '#f5222d'

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      volume: 0,
      songFullTime: 0,
      songCurrentTime: 0,
      songCurrentTimeSlider: 0,
      songData: []
    },
    this.likeOnToggle = this.likeOnToggle.bind(this);
    this.playOnToggle = this.playOnToggle.bind(this);
    this.secondToDate = this.secondToDate.bind(this);
    this.soundChange = this.soundChange.bind(this);
    this.songListToggle = this.songListToggle.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.preSong = this.preSong.bind(this);
  }

  componentDidMount() {
    this.setState({ volume: document.getElementsByTagName('audio')[0].volume * 100 })
    window.addEventListener('keydown', this.keypress);
  }

  // 键盘操作
  keypress = (e) => {
    e.stopPropagation();
    if (e.which === 38 && 100 >= this.state.volume > 0) {
      if (this.state.volume <= 90) {
        return this.setState({ volume: this.state.volume + 10 }, () => {
          this.soundChange(this.state.volume)
        })
      }
      return false;
    }
    if (e.which === 40 && 100 >= this.state.volume > 0) {
      if (this.state.volume >= 10) {
        return this.setState({ volume: this.state.volume - 10 }, () => {
          this.soundChange(this.state.volume)
        })
      }
      return false;
    }
    // 暂停播放 空格
    // if (e.which === 20 || e.which === 32) {
    //   this.playOnToggle();
    // }
    // // 快进
    // if (e.which === 39) { 
    //   this.playOnToggle();
    // }
    // // 快退
    // if (e.which === 37) {
    //   this.playOnToggle();
    // }
    // 上一首
    if (e.ctrlKey && (e.which === 37)) {
      this.preSong();
    }
    // 下一首
    if (e.ctrlKey && (e.which === 39)) {
      this.nextSong();
    }
  }
  // 收藏
  likeOnToggle = () => {
    this.props.onToggleLike(!this.props.setList.music.like);
  }
  // toggle 播放列表
  songListToggle = () => {
    this.props.onSongListToggle(!this.props.setList.music.songListShow);
  }
  // 播放
  playOnToggle = (e) => {
    // e.stopPropagation();
    if (this.props.setList.music.data.length === 0) {
      // console.log(1);
    } else {
      const duration = Math.floor(document.getElementsByTagName('audio')[0].duration) //总时长
      const currentTime = Math.floor(document.getElementsByTagName('audio')[0].currentTime) //当前时间 
      if (this.props.setList.music.playstate) {
        document.getElementsByTagName('audio')[0].pause();
        clearInterval(this.timer)
      } else {
        document.getElementsByTagName('audio')[0].play();
        this.timer = setInterval(
          () => {
            console.log(document.getElementsByTagName("audio")[0].buffered.end(0))
            this.setState({ songCurrentTime: Math.floor(document.getElementsByTagName('audio')[0].currentTime), songCurrentTimeSlider: Math.floor((document.getElementsByTagName('audio')[0].currentTime / document.getElementsByTagName('audio')[0].duration) * 100) });
            if (Math.floor(document.getElementsByTagName('audio')[0].currentTime) === Math.floor(document.getElementsByTagName('audio')[0].duration)) {
              this.nextSong();
            }
          }, 
          100
        );
      }
      this.setState({ songFullTime: duration })
      this.props.onPlayState(!this.props.setList.music.playstate)
    }
  }
  // 时间转换
  secondToDate = (result) => {
    // var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = m + ":" + s;
  }
  // 改变声音
  soundChange = (value) => {
    this.setState({ volume: value });
    document.getElementsByTagName('audio')[0].volume = this.state.volume / 100;
  }
  // 拖动mp3进度
  songLengthChange = (value) => {
    document.getElementsByTagName('audio')[0].currentTime = value / 100 * Math.floor(document.getElementsByTagName('audio')[0].duration);
    this.setState({ songCurrentTime: value, songCurrentTimeSlider: value });
  }
  // 下一首
  nextSong = () => {
    console.log(this.props.setList.music.songId, this.props.setList.music.data.length);
    if (this.props.setList.music.data.length >= this.props.setList.music.songId >= 0) {
      if (this.props.setList.music.songId > 1) {
        this.props.setList.music.songId = this.props.setList.music.songId - 1;
        console.log(this.props.setList.music.songId);
        this.props.setList.music.data.filter((item, index) => {
          if (item.sid === this.props.setList.music.songId) {
            // this.playOnToggle();
            this.props.onChangeSongPlayNow({
              songId: item.sid,
              src: item.src,
              songImg: item.img,
              songName: item.name,
              songAuthor: item.author
            });
          }
        })
      }
    }
  }
  // 上一首
  preSong = () => {
    // console.log(this.props.setList.music.songId, this.props.setList.music.data.length);
    if (this.props.setList.music.data.length >= this.props.setList.music.songId >= 0) {
      if (this.props.setList.music.songId < this.props.setList.music.data.length) {
        this.props.setList.music.songId = this.props.setList.music.songId + 1;
        console.log(this.props.setList.music.songId);
        this.props.setList.music.data.filter((item, index) => {
          if (item.sid === this.props.setList.music.songId) {
            // this.playOnToggle();
            this.props.onChangeSongPlayNow({
              songId: item.sid,
              src: item.src,
              songImg: item.img,
              songName: item.name,
              songAuthor: item.author
            });
          }
        })
      }
    }
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.setList.music.data !== this.props.setList.music.data && nextProps.setList.music.data.length === 1) {
      var audio = document.getElementsByTagName('audio')[0];
      audio.src = nextProps.setList.music.src;
      audio.load();
      audio.play();
      audio.oncanplay = () => {
        this.setState({ songFullTime: audio.duration })
      }
      clearInterval(this.timer);
      document.getElementsByTagName('audio')[0].play();
      this.timer = setInterval(
        () => {
          this.setState({ songCurrentTime: Math.floor(audio.currentTime), songCurrentTimeSlider: Math.floor((audio.currentTime / audio.duration) * 100) })
          if (!!document.getElementsByTagName('audio')[0] && Math.floor(document.getElementsByTagName('audio')[0].currentTime) === Math.floor(document.getElementsByTagName('audio')[0].duration)) {
            this.nextSong();
          }
        }, 100
      );
      this.props.onPlayState(true);
    }
    if (nextProps.setList.music.src !== this.props.setList.music.src) {
      this.setState({ songData: nextProps.setList.music.data })
      if (nextProps.setList.music.src !== this.props.setList.music.src) {
        var audio = document.getElementsByTagName('audio')[0];
        audio.src = nextProps.setList.music.src;
        audio.load();
        audio.play();
        audio.oncanplay = () => {
          this.setState({ songFullTime: audio.duration })
        }
        clearInterval(this.timer);
        document.getElementsByTagName('audio')[0].play();
        this.timer = setInterval(
          () => {
            this.setState({ songCurrentTime: Math.floor(audio.currentTime), songCurrentTimeSlider: Math.floor((audio.currentTime / audio.duration) * 100) });
            if ( !!document.getElementsByTagName('audio')[0] && Math.floor(document.getElementsByTagName('audio')[0].currentTime) === Math.floor(document.getElementsByTagName('audio')[0].duration)) {
              this.nextSong();
            }
          }, 100
        );
        this.props.onPlayState(true);
      }
      return false
    } else {
      return true
    }
  }

  render() {
    const cuurentTime = this.secondToDate(this.state.songCurrentTime);
    const songFullTime = this.secondToDate(this.state.songFullTime);
    const menu = (
      <div style={{ height: 200, background: '#fff', width: 34, marginBottom: 12, border: '1px solid #ccc', borderRadius: 5, padding: '5px 0px' }}>
        <Slider tipFormatter={null} vertical value={this.state.volume} style={{ height: 180 }} onChange={this.soundChange} onAfterChange={this.soundChange} />
      </div>
    );
    return (
      <div className='player' style={this.props.setList.left.collapsed ? { marginLeft: 80, width: 'calc(100% - 80px)' } : { marginLeft: 200, width: 'calc(100% - 200px)' }}>
        <audio id="audioPlayer" ref="audio" controls="controls" loop={true} preload="auto" style={{ display: 'none' }}>
          <source src={this.props.setList.music.src} type="audio/mpeg" />
        </audio>
        <div className='player_img'>
          <img src={this.props.setList.music.songImg} />
          <div className='songDetail'>
            <div className='songName' title={this.props.setList.music.songName}>{this.props.setList.music.songName}</div>
            <div className='songAythor' title={this.props.setList.music.songAuthor}>{this.props.setList.music.songAuthor}</div>
          </div>
          <div className='player_icon'>
            <span onClick={this.preSong}><Icon type="left-circle" style={{ color: iconColor }} /></span>
            <span onClick={this.playOnToggle}><Icon type={this.props.setList.music.playstate ? "pause-circle" : "play-circle"} style={{ color: iconColor }} /></span>
            <span onClick={this.nextSong}><Icon type="right-circle" style={{ color: iconColor }} /></span>
          </div>
          <div className='player_slider' style={this.props.setList.left.collapsed ? { width: 'calc(100% - 600px)' } : { width: 'calc(100% - 720px)' }}>
            <Slider tipFormatter={null} step={0.01} value={this.state.songCurrentTimeSlider} onChange={this.songLengthChange} onAfterChange={this.songLengthChange} />
          </div>
          <div className='player_icon playControll'>
            <span className='songTime'>{cuurentTime}/{songFullTime}</span>
            <span onClick={this.likeOnToggle}><Icon type="heart" theme={this.props.setList.music.like ? "filled" : ""} style={this.props.setList.music.like ? { color: like } : {}} /></span>
            <span>
              <Dropdown overlay={menu} placement="topCenter">
                <Icon type="notification" />
              </Dropdown>
            </span>
            <div className="songList" onClick={this.songListToggle}>
              <Icon type="bars" />
              <span>{this.props.setList.music.data.length}</span>
            </div>
          </div>
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
    onPlayState: (bool) => {
      dispatch(Actions.songPlayState(bool));
    },
    onToggleLike: (bool) => {
      dispatch(Actions.songLike(bool));
    },
    onSongListToggle: (bool) => {
      dispatch(Actions.songListToggle(bool));
    },
    onChangeSongPlayNow: (data) => {
      dispatch(Actions.songPlayNow(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);