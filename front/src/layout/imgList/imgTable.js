import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Table, Icon, Divider, Button } from 'antd';

const { Column, ColumnGroup } = Table;


class ImgTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: document.body.clientHeight - 250
    }
    this.addSongTolist = this.addSongTolist.bind(this);
  }
  componentDidMount() {
    this.props.onlist();
    this.props.onImgType();
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize = () => {
    this.setState({ window: document.body.clientHeight - 250 })
  }
  addSongTolist(record) {
    console.log(record)
  }
  // 编辑图片
  handleEdit = (record) => {
    this.props.onModelName('edit');
    this.props.onImgModle(true);
    this.props.onModleData(record);
    console.log(record)
  }
  // 删除图片
  handleDelet = (record) => {
    this.props.onModelName('del');
    this.props.onImgModle(true);
    this.props.onModleData(record)
    console.log(record)
  }
  // 查看图片
  handleWatch = (record) => {
    this.props.onModelName('watch');
    this.props.onImgModle(true);
    this.props.onModleData(record)
  }
  render() {
    const data = this.props.addSong.imgList.searchImgList.map((item) => {
      const data = {
        imgId: item.img_id,
        imgName: item.img_name,
        imgImg: item.img_img,
        imgTop: item.img_top,
        imgType: item.img_type
      }
      return data
    })
    return (
      <Table
        rowKey="imgList"
        scroll={{ y: this.state.window }}
        dataSource={data}
        pagination={{  //分页
          pageSize: 7,  //显示几条一页
          defaultPageSize: 7, //默认显示几条一页
          showSizeChanger: false,  //是否显示可以设置几条一页的选项
        }}>
        <Column
          title="图片名称"
          dataIndex="imgName"
          key="imgName"
          width={300}
          render={(text, record) => (
            <span className='imgName' onClick={() => { this.addSongTolist(record) }}>
              {record.imgName}
            </span>
          )}
        />
        <Column
          title="图片分组"
          dataIndex="imgType"
          key="imgType"
          render={(text, record) => (
            <span className='imgType'>
              {this.props.addSong.imgList.imgTypeList.map((item, index) => {
                if (item.imgType_id == record.imgType) {
                  return item.imgType_name
                } else {
                  return false
                }
              })}
            </span>
          )}
        />
        <Column
          title="图片"
          dataIndex="imgImg"
          key="imgImg"
          render={(text, record) => (
            <span>
              <img src={"http://localhost:3000/api/img/" + record.imgImg} style={{ height: 70 }} />
            </span>
          )}
        />
        <Column
          title="置顶"
          dataIndex="imgTop"
          key="imgTop"
          width={150}
          defaultSortOrder='descend'
          sorter={(a, b) => a.imgTop - b.imgTop}
          render={(text, record) => (
            <span style={{ textAlign: 'left' }}>
              {record.imgTop ? '已置顶' : '未置顶'}
            </span>
          )}
        />
        <Column
          title="操作"
          key="action"
          width={250}
          render={(text, record) => (
            <div className='userOperation'>
              <Button type="primary" size={'default'} onClick={text => { this.handleWatch(record) }}>查看</Button>
              <Button size={'default'} onClick={text => { this.handleEdit(record) }}>修改</Button>
              <Button type="danger" size={'default'} onClick={text => { this.handleDelet(record) }}>删除</Button>
            </div>
          )}
        />
      </Table>
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
    onlist: () => {
      dispatch(Actions.getList());
    },
    onModelName: (data) => {
      dispatch(Actions.modleName(data));
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    onImgModle: (bool) => {
      dispatch(Actions.imgModle(bool));
    },
    onImgType: (data) => {
      dispatch(Actions.getImgTypeList(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgTable);