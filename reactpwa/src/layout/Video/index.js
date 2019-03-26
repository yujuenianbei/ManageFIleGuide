import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import './index.less';

class Video extends Component {
    componentWillMount = () => {
        this.props.getVideo(this.props.match.params.id);
    }
    componentDidMount = () => {
        console.log(this.props)
    }
    render() {
        return (
            <div className="video">
                <div className="video_Content">
                    <video src={this.props.page.Http.video + this.props.page.Video.videoData.video_url} controls="controls">
                        your browser does not support the video tag
                    </video>
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