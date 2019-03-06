import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerControll from './playerControll';
import VideoInfo from './videoInfo'
import { link, index } from '../../left/redux/action';
import { Upload, message, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'

// const props = {
//   name: 'file',
//   action: '/api/profile',
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };


class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      fileList: [],
    }
    this.videoBack = this.videoBack.bind(this);
  }
  // handleChange = (info) => {
  //   console.log(info)
  //   let fileList = info.fileList;
  //   // 1. Limit the number of uploaded files
  //   // Only to show two recent uploaded files, and old ones will be replaced by the new
  //   fileList = fileList.slice(-2);
  //   // 2. Read from response and show file link
  //   fileList = fileList.map((file) => {
  //     if (file.response) {
  //       // Component will show file.url as link
  //       // file.url = 'http://localhost:3000/api/img/name/'+file.response.reqData;
  //       if (file.response.reqMimetype === "audio/mp3") {
  //         file.url = 'http://localhost:3000/api/music/' + file.response.reqData;
  //       }
  //       if (file.response.reqMimetype === "image/jpeg") {
  //         file.url = 'http://localhost:3000/api/img/' + file.response.reqData;
  //       }
  //       if (file.response.reqMimetype === "video/mp4") {
  //         file.url = 'http://localhost:3000/api/vedio/' + file.response.reqData;
  //       }
  //     }
  //     return file;
  //   });

  //   // 3. Filter successfully uploaded files according to response from server
  //   fileList = fileList.filter((file) => {
  //     if (file.response) {
  //       return file.response.reqCode === 200;
  //     }
  //     return true;
  //   });

  //   this.setState({ fileList });
  // }

  // 返回视频首页
  videoBack() {
    this.props.onChangeindex(2);
    this.props.onChangeLink("/video");
  }
  render() {
    const props = {
      name: 'file',
      action: '/api/profile',
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <div style={{ margin: 5, padding: 6, background: '#fff', overflow: 'auto', maxHeight: 865 }}>
        <Button><Link to="/video" onClick={this.videoBack}>返回</Link></Button>
        <div>
          <PlayerControll />
          <VideoInfo />
        </div>
        {/* <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" /> Upload
                  </Button>
        </Upload> */}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeLink: (data) => {
      dispatch(link(data))
    },
    onChangeindex: (data) => {
      dispatch(index(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoPlayer));