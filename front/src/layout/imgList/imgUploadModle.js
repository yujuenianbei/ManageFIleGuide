import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import './imgList.less';
import moment from 'moment';

import { Upload, Modal, Form, Select, Input, Button, DatePicker, Icon, message, Switch } from 'antd';


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
    if (nextProps.addSong.imgList.modleName === 'edit') {
      return true;
    }
    if (nextProps.addSong.imgList.modleName === 'add') {
      return true;
    }
    return true;
  }

  // 根据props改变而换url
  componentWillReceiveProps(nextProps) {
    // 关闭弹窗的操作
    if (this.props.addSong.musicList.imgModle === false) {
      this.setState({
        fileList: [],
        fileName: []
      })
    }
    // 当id不同时切换内容
    if (this.props.addSong.imgList.modleData.imgId !== nextProps.addSong.imgList.modleData.imgId && !!nextProps.addSong.imgList.modleData.imgId) {
      this.setState({
        fileList: [{
          uid: '-1',
          name: nextProps.addSong.imgList.modleData.imgName,
          status: 'done',
          url: 'http://localhost:3000/api/img/' + nextProps.addSong.imgList.modleData.imgImg,
          response: {
            reqCode: 200,
            reqData: nextProps.addSong.imgList.modleData.imgImg,
            reqMimetype: "image/jpeg"
          }
        }]
      })
    }
  }
  // 
  topChecked = (e) => {
    console.log(e);
  }

  uploadOk = (e) => {
    e.preventDefault();
    // 表单提交
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const values = {
          ...value,
        }
        if (this.props.addSong.imgList.modleName === 'add') {
          const url = '/api/imgInfo'
          const opts = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
              imgName: values.imgName,
              imgImg: this.state.fileList[0].response.reqData,
              imgTop: values.imgTop
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
                this.props.onImgModle(false);
                this.props.onlist();
                this.props.onModelName('');
              }
            })
            .catch((error) => {
              //网络请求失败,执行该回到函数,得到错误信息
            })
        }

        if (this.props.addSong.imgList.modleName === 'edit') {
          const data = JSON.stringify({
            imgId: this.props.addSong.imgList.modleData.imgId,
            imgName: values.imgName,
            imgImg: this.state.fileList[0].response.reqData,
            imgTop: values.imgTop
          })
          this.props.onEditImgInfo(data)
          this.props.onImgModle(false);
          this.props.onModleData({});
          this.props.onModelName('');
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
    this.props.onImgModle(false);
    this.props.onModleData({});
    this.props.onModelName('');
    this.setState({
      fileList: [],
      fileName: []
    })
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
    if (!!this.props.addSong.imgList.modleData.imgName && !!this.props.addSong.imgList.modleData) {
      return {
        imgName: this.props.addSong.imgList.modleData.imgName,
        imgImg: 'http://localhost:3000/api/img/' + this.props.addSong.imgList.modleData.imgImg,
        imgTop: this.props.addSong.imgList.modleData.imgTop,
      }
    }
    return {
      imgName: '',
      imgImg: '',
      imgTop: false,
    }
  }

  render() {
    console.log(this.state)
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
      <div>
        {this.props.addSong.imgList.modleName === 'watch' &&
          <Modal
            width={1200}
            centered
            title='查看图片'
            visible={this.props.addSong.imgList.imgModle && this.props.addSong.imgList.modleName === 'watch'}
            onCancel={this.uploadCancel}
            footer={null}
          >
            <img className='watchImg' src={"http://localhost:3000/api/img/" + this.props.addSong.imgList.modleData.imgImg} />
          </Modal>
        }
        {this.props.addSong.imgList.modleName !== 'watch' &&
          <Modal
            title={this.props.addSong.imgList.modleName === 'add' ? '新增图片' : '编辑图片'}
            visible={this.props.addSong.imgList.imgModle && (this.props.addSong.imgList.modleName === 'add' || this.props.addSong.imgList.modleName === 'edit')}
            centered
            onOk={this.uploadOk}
            onCancel={this.uploadCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form>
              <FormItem
                label="图片名称"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('imgName', {
                  rules: [{ required: true, message: '请输入图片名称!' }],
                  initialValue: this.defalutValue().imgName
                })(
                  <Input />
                )}
              </FormItem>
              {this.props.addSong.imgList.modleName === 'add' &&
                <div>
                  <FormItem
                    label="图片文件"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('imgImg', {
                      rules: [{ required: true, message: '请上传图片文件!' }],
                      initialValue: this.defalutValue().imgImg
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
                    label="是否置顶"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('imgTop', {
                      rules: [{ required: true, message: '请确认置顶状态!' }],
                      initialValue: this.defalutValue().imgTop
                    })(
                      <Switch checkedChildren="是" unCheckedChildren="否" onChange={this.topChecked} defaultChecked={false} />
                    )}
                  </FormItem>
                </div>
              }
              {this.props.addSong.imgList.modleName === 'edit' &&
                <FormItem
                  label="是否置顶"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}>
                  {getFieldDecorator('imgTop', {
                    rules: [{ required: true, message: '请确认置顶状态!' }],
                    initialValue: this.defalutValue().imgTop
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否" onChange={this.topChecked} defaultChecked={this.props.addSong.imgList.modleData.imgTop} />
                  )}
                </FormItem>
              }
            </Form>
          </Modal>
        }
      </div>


    );
  }
}
const ImgControllForm = Form.create()(App);


const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onImgModle: (bool) => {
      dispatch(Actions.imgModle(bool));
    },
    onlist: () => {
      dispatch(Actions.getList());
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    // 修改歌曲信息
    onEditImgInfo: (data) => {
      dispatch(Actions.editImgInfo(data))
    },
    // 
    onModelName: (data) => {
      dispatch(Actions.modleName(data));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgControllForm);



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