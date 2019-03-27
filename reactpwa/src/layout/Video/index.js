import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Tooltip, Dropdown, Form, Select, Input, Button, DatePicker, Upload, Icon, message, Slider } from 'antd';
import './index.less';

class Video extends Component {
    constructor(props) {
        super(props);
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
    }
    componentWillMount = () => {
        this.props.getVideo(this.props.match.params.id);
    }
    componentDidMount = () => {
        // this.setState({ volume: document.getElementsByTagName('video')[0].volume * 100 });
        clearInterval(this.timer);
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

    videoPause = () => {
        console.log(window.orientation)
        var video = document.getElementById('video');
        console.log(video)
        if (this.state.pause === true) {
            video.play();
            console.log(video.currentTime);
            console.log(video.volume);
            console.log(video.duration);
            video.oncanplay = () => {
                console.log(video.duration)
                // this.setState({ videoFullTime: video.duration })
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
            this.setState({ pause: false })
        } else {
            video.pause();
            this.setState({ pause: true })
        }
    }
    render() {
        return (
            this.props.page.Video.videoData && <div className="video">
                   <div id='videoPlayer' className="video_Content" style={{ position: 'relative', width: '100%',backgroundColor: '#000' }}>
                    <video
                        objectfit='contain'
                        id='video'
                        width='100%'
                        height={this.state.fullScreen ? '100%' : 'auto'}
                        loop={this.state.videLoop}
                        controls={false}
                        onDoubleClick={this.videoPause}
                        poster={this.props.page.Http.img + this.props.page.Video.videoData.video_img}
                        webkit-playsinline="true"
                        playsInline={true} 
                        x-webkit-airplay="true"
                        x5-video-player-type='h5' 
                        x5-video-player-fullscreen="true"
                        x5-video-ignore-metadata="true"
                    >
                        <source src={this.props.page.Http.video + this.props.page.Video.videoData.video_url} type="video/mp4" />
                        your browser does not support the video tag
                    </video>

                </div>
                <div id='controller' className={this.state.fullScreen ? 'videoController videoFullScreen' : 'videoController videoNotFullScreen'} style={{ display: this.state.controllerShow }}
                    onMouseEnter={this.notFullScreenController} >
                    <span className='videoButton videoButtonLeft playButton'>
                        <Tooltip title={this.state.pause ? '播放' : '暂停'} placement="bottom">
                            <Icon type={this.state.pause ? "caret-right" : "pause"} onClick={this.videoPause} style={{color: '#fff'}} />
                        </Tooltip>
                    </span>
                    <div style={{ width: 'calc(100% - 200px)', float: 'left', marginLeft: 10 }}>
                        <Slider tipFormatter={null} value={this.state.videoCurrentTimeSlider} onChange={this.videoLengthChange} onAfterChange={this.videoLengthChange} />
                    </div>
                    <div style={{ width: 40, height: 30, float: "right", marginLeft:10}}>
                        <Slider tipFormatter={null} value={this.state.volume} onChange={this.soundChange} onAfterChange={this.soundChange} />
                    </div>
                    <span className='videoButton videoButtonRight'>
                        <Tooltip title={this.state.fullScreen ? '关闭全屏' : '打开全屏'} placement="bottom">
                            <Icon type={this.state.fullScreen ? "fullscreen-exit" : "fullscreen"}  style={{color: '#fff'}} theme="outlined" onClick={this.state.fullScreen ? this.exitFullscreen : this.FullScreen} />
                        </Tooltip>
                    </span>
                    <span className='videoButton videoButtonRight playButton'>
                        <Tooltip title={this.state.videLoop ? '关闭无脑循环' : '打开无脑循环'} placement="bottom">
                            <Icon type={this.state.videLoop ? "retweet" : "swap"} theme="outlined" onClick={this.videoLoopState} style={{color: '#fff'}} />
                        </Tooltip>
                    </span>
                    <span className='timer videoButton videoButtonRight'>
                        {this.state.currentTime}/{this.state.duration}
                    </span>
                </div>
                {/* <div className='videoPause' style={{ display: this.state.showPlayBtn ? "block" : "none" }}>
                    <Icon className='videoPauseIcon' type={this.state.pause ? "play-circle" : "pause-circle"} onClick={this.videoPause} />
                </div> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        page: state
    }
}
const mapDisatchToProps = (dispatch) => {
    return {
        getVideo: (id) => { dispatch(Actions.getVideo(id)) },
    }
}
export default connect(mapStateToProps, mapDisatchToProps)(Video);