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
            controllerShow: 'block',
            fullWidth: false,
            showContoller: true,
            url: ''
        }
    }
    componentWillMount = () => {
        this.props.getVideo(this.props.match.params.id);
    }
    componentDidMount = () => {
        clearInterval(this.timer);
        this.controller = setTimeout(
            () => {
                this.setState({ showContoller: false })
            }, 3000
        )
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.page.Video.videoData !== this.props.page.Video.videoData || this.props.page.Video.videoData != '') {
            return true
        } else {
            return false
        }
    }
    componentWillReceiveProps = (nextProps)=> {
        this.setState({url:this.props.page.Http.video + nextProps.page.Video.videoData.video_url})
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
        this.fullpage = setInterval(
            () => {
                if (window.screen.width > window.screen.height) {
                    this.setState({ fullWidth: true })
                } else {
                    this.setState({ fullWidth: false })
                }
            }, 1000)
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
        this.setState({ fullScreen: false, fullWidth: false });
        clearInterval(this.fullpage)
    }
    // 暂停、播放
    videoPause = () => {
        // console.log(window.orientation)
        var video = document.getElementById('video');
        // console.log(video)
        if (this.state.pause === true) {
            video.play();
            // console.log(video.currentTime);
            // console.log(video.volume);
            // console.log(video.duration);
            video.oncanplay = () => {
                // console.log(video.duration)
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
            this.setState({ pause: false })
        } else {
            video.pause();
            this.setState({ pause: true })
        }
    }
    // 
    showController = () => {
        clearTimeout(this.controller);
        clearTimeout(this.nextController);
        this.setState({ showContoller: true })
        this.nextController = setTimeout(
            () => {
                this.setState({ showContoller: false })
            }, 5000
        )

    }
    render() {
        return (
            this.props.page.Video.videoData && this.state.url && <div className="video">
                <div id='videoPlayer' className="video_Content" style={{ position: 'relative', width: '100%', height: this.state.fullScreen ? '100%' : '13rem' }} onTouchMove={this.showController}>
                    <div className='videoPlayer_Content' objectfit='contain' style={{ margin: '0 auto', width: this.state.fullWidth ? '100%' : 'auto', height: !this.state.fullWidth ? '100%' : 'auto' }}>
                        <video
                            id='video'
                            width={!this.state.fullWidth ? '100%' : 'auto'}
                            height={this.state.fullScreen && this.state.fullWidth ? window.screen.height : '100%'}
                            loop={this.state.videLoop}
                            controls={false}
                            onClick={this.showController}
                            onDoubleClick={this.videoPause}
                            poster={this.props.page.Http.img + this.props.page.Video.videoData.video_img}
                            webkit-playsinline="true"
                            playsInline={true}
                            x-webkit-airplay="true"
                            x5-video-player-type='h5'
                            x5-video-player-fullscreen="true"
                            x5-video-ignore-metadata="true"
                        >
                            <source src={this.state.url} type="video/mp4" />
                            your browser does not support the video tag
                    </video>
                        <div id='controller' className={this.state.fullScreen ? 'videoController videoFullScreen' : 'videoController videoNotFullScreen'}
                            style={{
                                // left: this.state.fullWidth?  (document.getElementById('videoPlayer').clientWidth - document.getElementById('video').clientWidth)/2' : '0',
                                // width: this.state.fullWidth? document.getElementById('video').clientWidth: '100%', 
                                width: '100%',
                                top: this.state.fullScreen ? 'auto' : this.state.showContoller ? '-36px' : '-5px',
                                bottom: this.state.fullScreen ? (this.state.showContoller ? '0' : '-36px') : 'auto',
                                position: this.state.fullScreen ? 'absolute' : 'relative',
                            }}
                            onMouseEnter={this.notFullScreenController} >
                            <span className='videoButton videoButtonLeft playButton'>
                                <Icon type={this.state.pause ? "caret-right" : "pause"} onClick={this.videoPause} style={{ color: '#fff' }} />
                            </span>
                            {/* 200px */}
                            <div style={{ width: 'calc(100% - 170px)', float: 'left', marginLeft: 10 }}>
                                <Slider tipFormatter={null} value={this.state.videoCurrentTimeSlider} onChange={this.videoLengthChange} onAfterChange={this.videoLengthChange} />
                            </div>
                            <span className='videoButton videoButtonRight playButton'>
                                <Icon type={this.state.fullScreen ? "fullscreen-exit" : "fullscreen"} style={{ color: '#fff' }} theme="outlined" onClick={this.state.fullScreen ? this.exitFullscreen : this.FullScreen} />

                            </span>
                            <span className='videoButton videoButtonRight playButton'>
                                <Icon type={this.state.videLoop ? "retweet" : "swap"} theme="outlined" onClick={this.videoLoopState} style={{ color: '#fff' }} />
                            </span>
                            <span className='timer videoButton videoButtonRight'>
                                {this.state.currentTime}/{this.state.duration}
                            </span>
                        </div>
                        {/* <div className='videoPause' style={{ display: this.state.showPlayBtn ? "block" : "none" }}>
                    <Icon className='videoPauseIcon' type={this.state.pause ? "play-circle" : "pause-circle"} onClick={this.videoPause} />
                </div> */}
                    </div>
                </div>
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