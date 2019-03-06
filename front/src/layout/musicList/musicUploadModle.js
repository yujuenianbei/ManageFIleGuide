import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import './musicList.less';
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
    if (nextProps.addSong.musicList.modleName === 'edit') {
      return true;
    }
    if (nextProps.addSong.musicList.modleName === 'add') {
      return true;
    }
    return true;
  }
  // 根据props改变而换url
  componentWillReceiveProps(nextProps) {
    // 关闭弹窗的操作
    if(this.props.addSong.musicList.songModle === false) {
      this.setState({
        fileList: [],
        fileName: []
      })
    }
    // 当id不同时切换内容
    if (this.props.addSong.musicList.modleData.songId !== nextProps.addSong.musicList.modleData.songId && !!nextProps.addSong.musicList.modleData.songId) {
      this.setState({
        fileList: [{
          uid: '-1',
          name: nextProps.addSong.musicList.modleData.songImg,
          status: 'done',
          url: 'http://localhost:3000/api/img/' + nextProps.addSong.musicList.modleData.songImg,
          response: {
            reqCode: 200,
            reqData: nextProps.addSong.musicList.modleData.songImg,
            reqMimetype: "image/jpeg"
          }
        }],
        fileName: [{
          uid: '-1',
          name: nextProps.addSong.musicList.modleData.songName,
          status: 'done',
          url: 'http://localhost:3000/api/music/' + nextProps.addSong.musicList.modleData.songUrl,
          response: {
            reqCode: 200,
            reqData: nextProps.addSong.musicList.modleData.songUrl,
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
          'songAlbumdate': value['songAlbumdate'].format('YYYY-MM-DD')
        }
        if (this.props.addSong.musicList.modleName === 'add') {
          const url = '/api/songInfo'
          const opts = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
              songName: values.songName,
              authorName: values.authorName,
              songAlbum: values.songAlbum,
              songAlbumdate: values.songAlbumdate,
              songImg: this.state.fileList[0].response.reqData,
              songUrl: this.state.fileName[0].response.reqData,
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
              this.props.onModleData({});
              if (res.reqCode === 200) {
                this.props.onSongModle(false)
                this.props.onlist()
              }
            })
            .catch((error) => {
              //网络请求失败,执行该回到函数,得到错误信息
            })
        }
        if (this.props.addSong.musicList.modleName === 'edit') {
          const data = JSON.stringify({
            songId: this.props.addSong.musicList.modleData.songId,
            songName: values.songName,
            authorName: values.authorName,
            songAlbum: values.songAlbum,
            songAlbumdate: values.songAlbumdate,
            songImg: this.state.fileList[0].response.reqData,
            songUrl: this.state.fileName[0].response.reqData,
          })
          this.props.onEditSongInfo(data)
          this.props.onSongModle(false);
          this.props.onModleData({});
          // 提交之后置空内容
          this.props.form.resetFields();
        }
      }
    });
    this.setState({
      fileList: [],
      fileName: []
    });
  }

  uploadCancel = () => {
    this.props.onSongModle(false);
    this.props.onModleData({});
    this.setState({
      fileList: [],
      fileName: []
    })
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
  removeSongFile = (file) => {
    this.setState({
      fileName: []
    })
  }
  // 上传MP3文件名
  handleUploadSongChange = ({ fileList }) => {
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
    if (!!this.props.addSong.musicList.modleData.songName) {
      return {
        songName: this.props.addSong.musicList.modleData.songName,
        authorName: this.props.addSong.musicList.modleData.authorName,
        songUrl: this.props.addSong.musicList.modleData.songUrl,
        songAlbum: this.props.addSong.musicList.modleData.songAlbum,
        songAlbumdate: this.props.addSong.musicList.modleData.songAlbumdate,
        songImg: 'http://localhost:3000/api/img/' + this.props.addSong.musicList.modleData.songImg
      }
    }
    return {
      songName: '',
      authorName: '',
      songUrl: '',
      songAlbumdate: "1970-01-01",
      songAlbum: '',
      songImg: ''
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
        title={this.props.addSong.musicList.modleName === 'add' ? '新增歌曲' : '编辑歌曲'}
        visible={this.props.addSong.musicList.songModle && (this.props.addSong.musicList.modleName === 'add' || this.props.addSong.musicList.modleName === 'edit')}
        onOk={this.uploadOk}
        onCancel={this.uploadCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form>
          <FormItem
            label="歌曲名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('songName', {
              rules: [{ required: true, message: '请输入歌曲名称!' }],
              initialValue: this.defalutValue().songName
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
            label="专辑名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('songAlbum', {
              rules: [{ required: true, message: '请输入专辑名称!' }],
              initialValue: this.defalutValue().songAlbum
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="发专时间"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('songAlbumdate', {
              rules: [{ required: true, message: '请输入发专时间!' }],
              initialValue: moment(this.defalutValue().songAlbumdate, 'YYYY-MM-DD')
            })(
              <DatePicker style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            label="专辑封面"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('songImg', {
              rules: [{ required: true, message: '请输入专辑封面!' }],
              initialValue: this.defalutValue().songImg
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
            label="歌曲文件"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('songUrl', {
              rules: [{ required: true, message: '请输入歌曲文件!' }],
              initialValue: this.defalutValue().songUrl
            })(
              <Upload {...props}
                fileList={this.state.fileName}
                onRemove={this.removeSongFile}
                onChange={this.handleUploadSongChange}>
                <Button>
                  <Icon type="upload" /> 上传歌曲
                </Button>
              </Upload>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const MusicControllForm = Form.create()(App);


const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSongModle: (bool) => {
      dispatch(Actions.songModle(bool));
    },
    onlist: () => {
      dispatch(Actions.getList());
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    // 修改歌曲信息
    onEditSongInfo: (data) => {
      dispatch(Actions.editSongInfo(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicControllForm);



  // handleChange = (info) => {
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


  // upload = () => {
  //   console.log(this.refs.myInput.files[0])
  //   let f = this.refs.myInput.files[0];
  //   let formData = new FormData()
  //   formData[0] = f
  //   console.log(formData)
  //   fetch('/api/upload', {
  //     method: "POST",
  //     mode: "cors",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "multipart/form-data;boundary=123"
  //     },
  //     body: formData
  //   })
  // }