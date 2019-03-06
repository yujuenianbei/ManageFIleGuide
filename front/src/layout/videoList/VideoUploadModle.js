import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import './VideoList.less';
import moment from 'moment';

import { Upload, Modal, Form, Select, Input, Button, DatePicker, Icon, message } from 'antd';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  console.log(file)
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

const FormItem = Form.Item;
const Option = Select.Option;
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileName: [],
      fileList: [],
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.addSong.videoList.modleName === 'edit') {
      return true;
    }
    if (nextProps.addSong.videoList.modleName === 'add') {
      return true;
    }
    return true;
  }
  // 根据props改变而换url
  componentWillReceiveProps(nextProps) {
    // 关闭弹窗的操作
    if(this.props.addSong.videoList.videoModle === false) {
      this.setState({
        fileList: [],
        fileName: []
      })
    }
    // 当id不同时切换内容
    if (this.props.addSong.videoList.modleData.videoId !== nextProps.addSong.videoList.modleData.videoId) {
      this.setState({
        fileList: [{
          uid: '-1',
          name: nextProps.addSong.videoList.modleData.videoImg,
          status: 'done',
          url: 'http://localhost:3000/api/img/' + nextProps.addSong.videoList.modleData.videoImg,
          response: {
            reqCode: 200,
            reqData: nextProps.addSong.videoList.modleData.videoImg,
            reqMimetype: "image/jpeg"
          }
        }],
        fileName: [{
          uid: '-1',
          name: nextProps.addSong.videoList.modleData.videoName,
          status: 'done',
          url: 'http://localhost:3000/api/Video/' + nextProps.addSong.videoList.modleData.videoUrl,
          response: {
            reqCode: 200,
            reqData: nextProps.addSong.videoList.modleData.videoUrl,
            reqMimetype: "audio/mp3"
          }
        }]
      })
    }
  }
  uploadOk = (e) => {
    e.preventDefault();
    // 表单提交
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const values = {
          ...value,
          'videoAlbumdate': value['videoAlbumdate'].format('YYYY-MM-DD')
        }
        if (this.props.addSong.videoList.modleName === 'add') {
          const url = '/api/videoInfo'
          const opts = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
              videoName: values.videoName,
              authorName: values.authorName,
              videoAlbum: values.videoAlbum,
              videoAlbumdate: values.videoAlbumdate,
              videoImg: this.state.fileList[0].response.reqData,
              videoUrl: this.state.fileName[0].response.reqData,
            })
          }
          fetch(url, opts)
            .then((res) => {
              //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
              //json text等
              //你可以在这个时候将Promise对象转换成json对象:response.json()
              //转换成json对象后return，给下一步的.then处理
              return res.json();
              //或 return response.json();
            })
            .then((res) => {
              console.log(res)
              if (res.reqCode === 200) {
                this.props.onvideoModle(false)
                this.props.onlist()
              }
            })
            .catch((error) => {
              //网络请求失败,执行该回到函数,得到错误信息
            })
        }

        if (this.props.addSong.videoList.modleName === 'edit') {
          const data = JSON.stringify({
            videoId: this.props.addSong.videoList.modleData.videoId,
            videoName: values.videoName,
            authorName: values.authorName,
            videoAlbum: values.videoAlbum,
            videoAlbumdate: values.videoAlbumdate,
            videoImg: this.state.fileList[0].response.reqData,
            videoUrl: this.state.fileName[0].response.reqData,
          })
          this.props.onEditvideoInfo(data)
          this.props.onvideoModle(false);
          this.props.onModleData({});
          // 提交之后置空内容
          this.props.form.resetFields();
        }
      }
    });
  }

  uploadCancel = () => {
    this.props.onvideoModle(false);
    this.props.onModleData({})
  }

  // 上传图片
  // onUploadImgChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => this.setState({
  //       imageUrl,
  //       loading: false,
  //     }));
  //   }
  // }

  // 上传MP3
  onUploadChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.setState({ fileName: info.file.response.reqData })
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  }
  // 删除音乐文件
  removevideoFile = (file) => {
    this.setState({
      fileName: []
    })
  }
  // 上传MP3文件名
  handleUploadvideoChange = ({ fileList }) => {
    // console.log(fileList)
    this.setState({ fileName: fileList })
  }
  // 取消预览
  handleUploadImgCancel = () => this.setState({ previewVisible: false })
  // 预览图片
  handleUploadImgPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  // 上传图片
  handleUploadImgChange = ({ fileList }) => this.setState({ fileList: fileList })

  // 设置初始化值
  defalutValue = () => {
    if (!!this.props.addSong.videoList.modleData.videoName) {
      return {
        videoName: this.props.addSong.videoList.modleData.videoName,
        authorName: this.props.addSong.videoList.modleData.authorName,
        videoUrl: this.props.addSong.videoList.modleData.videoUrl,
        videoAlbum: this.props.addSong.videoList.modleData.videoAlbum,
        videoAlbumdate: this.props.addSong.videoList.modleData.videoAlbumdate,
        videoImg: 'http://localhost:3000/api/img/' + this.props.addSong.videoList.modleData.videoImg
      }
    }
    return {
      videoName: '',
      authorName: '',
      videoUrl: '',
      videoAlbumdate: "1970-01-01",
      videoAlbum: '',
      videoImg: ''
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    const props = {
      name: 'file',
      action: '/api/profile/',
      onChange: this.onUploadChange,
    };
    return (
      <Modal
        title={this.props.addSong.videoList.modleName === 'add' ? '新增视频' : '编辑视频'}
        visible={this.props.addSong.videoList.videoModle && (this.props.addSong.videoList.modleName === 'add' || this.props.addSong.videoList.modleName === 'edit')}
        onOk={this.uploadOk}
        onCancel={this.uploadCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form>
          <FormItem
            label="视频名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('videoName', {
              rules: [{ required: true, message: '请输入视频名称!' }],
              initialValue: this.defalutValue().videoName
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="歌手名"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('authorName', {
              rules: [{ required: true, message: '请输入歌手名!' }],
              initialValue: this.defalutValue().authorName
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="视频名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('videoAlbum', {
              rules: [{ required: true, message: '请输入视频名称!' }],
              initialValue: this.defalutValue().videoAlbum
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="发专时间"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('videoAlbumdate', {
              rules: [{ required: true, message: '请输入发专时间!' }],
              initialValue: moment(this.defalutValue().videoAlbumdate, 'YYYY-MM-DD')
            })(
              <DatePicker style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            label="视频封面"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('videoImg', {
              rules: [{ required: true, message: '请输入视频封面!' }],
              initialValue: this.defalutValue().videoImg
            })(
              <div className="clearfix">
                <Upload
                  action="/api/profile"
                  listType="picture-card"
                  fileList={this.state.fileList}
                  onPreview={this.handleUploadImgPreview}
                  onChange={this.handleUploadImgChange}
                >
                  {this.state.fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleUploadImgCancel}>
                  <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
              </div>
            )}
          </FormItem>
          <FormItem
            label="视频文件"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('videoUrl', {
              rules: [{ required: true, message: '请输入视频文件!' }],
              initialValue: this.defalutValue().videoUrl
            })(
              <Upload {...props}
                fileList={this.state.fileName}
                onRemove={this.removevideoFile}
                onChange={this.handleUploadvideoChange}>
                <Button>
                  <Icon type="upload" /> 上传视频
                </Button>
              </Upload>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const VideoControllForm = Form.create()(App);


const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onvideoModle: (bool) => {
      dispatch(Actions.videoModle(bool));
    },
    onlist: () => {
      dispatch(Actions.getList());
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    // 修改视频信息
    onEditvideoInfo: (data) => {
      dispatch(Actions.editvideoInfo(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoControllForm);
