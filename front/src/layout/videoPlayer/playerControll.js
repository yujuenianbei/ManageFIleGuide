import React, { Component } from 'react';
import { Modal, Tooltip, Dropdown, Form, Select, Input, Button, DatePicker, Upload, Icon, message, Slider } from 'antd';
import './video.less'

class PlayerControll extends Component {
  constructor() {
    super();
    this.state = {
      pause: true,
      showPlayBtn: true,
      fullScreen: false,
      volume: 0,
      videoCurrentTime: 0,
      videoFullTime: 0,
      videoCurrentTimeSlider: 0,
      currentTime: '00:00',
      duration: '00:00',
      videLoop: false,
      controllerShow: 'block'
    }
    this.videoPause = this.videoPause.bind(this);
  }
  componentDidMount() {
    window.onresize = () => {
      if (document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled) {
        window.addEventListener('keydown', this.keypress);
      }
    }
    this.setState({ volume: document.getElementsByTagName('video')[0].volume * 100 });
    window.addEventListener('keydown', this.keypress);
    clearInterval(this.timer);
  };
  // 键盘操作
  keypress = (e) => {
    e.stopPropagation();
    // 增加音量 +
    if (e.which === 107 && 100 >= this.state.volume > 0) {
      if (this.state.volume <= 90) {
        return this.setState({ volume: this.state.volume + 10 }, () => {
          this.soundChange(this.state.volume);
        })
      }
      return false;
    }
    // 减小音量 -
    if (e.which === 109 && 100 >= this.state.volume > 0) {
      if (this.state.volume >= 10) {
        return this.setState({ volume: this.state.volume - 10 }, () => {
          this.soundChange(this.state.volume);
        })
      }
      return false;
    }
    // 暂停播放 空格
    if (e.ctrlKey && (e.which === 20 || e.which === 32)) {
      this.videoPause();
    }
    // 退出全屏 ctrl+z
    if (e.ctrlKey && (e.which === 90)) {
      this.exitFullscreen();
    }
    // 进入全屏 ctrl+x
    if (e.ctrlKey && (e.which === 88)) {
      this.FullScreen();
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
    document.getElementsByTagName('video')[0].volume = this.state.volume / 100;
  }
  // 拖动进度
  videoLengthChange = (value) => {
    document.getElementsByTagName('video')[0].currentTime = value / 100 * Math.floor(document.getElementsByTagName('video')[0].duration);
    this.setState({ videoCurrentTime: value, videoCurrentTimeSlider: value });
  }
  // 视频循环
  videoLoopState = () => {
    this.setState({ videLoop: !this.state.videLoop });
  }
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.setList.music.src !== this.props.setList.music.src) {
  //     this.setState({ songData: nextProps.setList.music.data })
  //     if (nextProps.setList.music.src !== this.props.setList.music.src) {
  //       console.log(nextProps.setList.music.src)
  //       var audio = document.getElementsByTagName('audio')[0];
  //       audio.src = nextProps.setList.music.src;
  //       audio.load();
  //       audio.play();
  //       audio.oncanplay = () => {
  //         console.log(audio.duration)
  //         this.setState({ songFullTime: audio.duration })
  //       }
  //       clearInterval(this.timer);
  //       document.getElementsByTagName('audio')[0].play();
  //       this.timer = setInterval(
  //         () => {
  //           this.setState({ songCurrentTime: Math.floor(audio.currentTime), songCurrentTimeSlider: Math.floor((audio.currentTime / audio.duration) * 100) })
  //         },1000
  //     );
  //       this.props.onPlayState(true);
  //     }
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  //进入全屏
  FullScreen = () => {
    var ele = document.getElementById('videoPlayer')
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullScreen) {
      ele.webkitRequestFullScreen();
    }
    this.setState({ fullScreen: true });
  }
  //退出全屏
  exitFullscreen = () => {
    var de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
    }
    this.setState({ fullScreen: false });
  }

  keypress(e) {
    e.stopPropagation();
    if (e.which === 27) {
      return console.log('你按了ESC键...')
    }
    if (e.which === 13) {
      return console.log('你按了回车键...')
    }
  }

  videoPause() {
    var video = document.getElementById('video');
    console.log(video)
    if (this.state.pause === true) {
      video.play();
      console.log(video.currentTime);
      console.log(video.volume);
      console.log(video.duration);
      video.oncanplay = () => {
        console.log(video.duration)
        this.setState({ videoFullTime: video.duration })
      }
      this.timer = setInterval(
        () => {
          this.setState({
            videoCurrentTime: Math.floor(video.currentTime),
            videoCurrentTimeSlider: Math.floor((video.currentTime / video.duration) * 100),
            currentTime: this.secondToDate(video.currentTime),
            duration: this.secondToDate(video.duration)
          })
        }, 1000)
      this.setState({ pause: false, showPlayBtn: false })
    } else {
      video.pause();
      this.setState({ pause: true, showPlayBtn: true })
    }
  }
  // 全屏时不移动鼠标 收起进度条
  fullScreenController = () => {
    this.notFullScreenController();
    this.timers = setTimeout(() => {
      this.setState({ controllerShow: 'none' });
    }, 3000);
  }
  // 退出全屏后 显示进度条
  notFullScreenController = () => {
    this.setState({ controllerShow: 'block' });
  }

  render() {
    console.log(window.location.hash.split('/')[2])
    const url = "/api/video/" + window.location.hash.split('/')[2]
    const img = "/api/img/" + window.location.hash.split('/')[3]
    const state = this.state;
    return (
      <div className="videoPlay" style={{ margin: '5px 0px', background: '#fff' }}>
        <div id='videoPlayer' style={{ position: this.state.fullScreen ? 'absolute' : 'relative', width: this.state.fullScreen ? '100%' : '1067px', objectFit: 'fill', float: 'left', height: '100%' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <video id='video'
              style={{ background: '#000' }}
              width="100%"
              height={this.state.fullScreen ? '100%' : "600"}
              poster={img}
              controls={false}
              loop={this.state.videLoop}
              onClick={this.videoPause}
              onMouseMove={this.state.fullScreen ? this.fullScreenController : this.notFullScreenController}
            // onDoubleClick={this.state.fullScreen ? this.exitFullscreen : this.FullScreen}
            >
              <source src={url} type="video/mp4" />
            </video>
          </div>
          <div id='controller' className={this.state.fullScreen ? 'videoController videoFullScreen' : 'videoController videoNotFullScreen'} style={{ display: this.state.controllerShow }}
            onMouseEnter={this.notFullScreenController} >
            {/* onMouseOut={()=>console.log(1)} onMouseOver={()=>console.log(2)} */}
            <span className='videoButton videoButtonLeft'>
              <Tooltip title={this.state.pause ? '播放' : '暂停'} placement="bottom">
                <Icon type={this.state.pause ? "caret-right" : "pause"} onClick={this.videoPause} />
              </Tooltip>
            </span>
            <div style={{ width: 'calc(100% - 300px)', float: 'left' }}>
              <Slider tipFormatter={null} value={this.state.videoCurrentTimeSlider} onChange={this.videoLengthChange} onAfterChange={this.videoLengthChange} />
            </div>
            <span className='videoButton videoButtonRight'>
              <Tooltip title={this.state.fullScreen ? '关闭全屏' : '打开全屏'} placement="bottom">
                <Icon type={this.state.fullScreen ? "fullscreen-exit" : "fullscreen"} theme="outlined" onClick={this.state.fullScreen ? this.exitFullscreen : this.FullScreen} />
              </Tooltip>
            </span>
            <div style={{ width: 100, height: 36, background: '#fff', float: "right", marginRight: 10 }}>
              <Slider tipFormatter={null} value={this.state.volume} onChange={this.soundChange} onAfterChange={this.soundChange} />
            </div>
            <span className='videoButton videoButtonRight'>
              <Tooltip title={this.state.videLoop ? '关闭无脑循环' : '打开无脑循环'} placement="bottom">
                <Icon type={this.state.videLoop ? "retweet" : "swap"} theme="outlined" onClick={this.videoLoopState} />
              </Tooltip>
            </span>
            <span className='timer videoButton videoButtonRight'>
              {this.state.currentTime}/{this.state.duration}
            </span>
          </div>
          <div className='videoPause' style={{ display: this.state.showPlayBtn ? "block" : "none" }}>
            <Icon className='videoPauseIcon' type={this.state.pause ? "play-circle" : "pause-circle"} onClick={this.videoPause} />
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerControll;