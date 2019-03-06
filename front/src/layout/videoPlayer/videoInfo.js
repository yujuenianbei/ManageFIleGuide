import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Icon, Pagination } from 'antd';

class VideoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="videoInfo">
        <div className='videoMV'>
          MV简介
        </div>
        <div className="videoRealInfo">
          <div className='videoTime'>发布时间：2018-12-01</div>
          <div className='videoPlayTimes'>播放次数：91万次</div>
          <div className='videoInformation'>
            <span className='videoPlayTimes'>简介：</span>A妹Ariana Grande新单《thank u, next》MV公开！
              A妹Ariana Grande冠军单曲《thank u, next》官方录影带解锁！MV里致敬了《贱女孩》《律政俏佳人》《女孩梦三十》《美少女啦啦队》 等多部经典电影！</div>
        </div>
        <div className='comment'>
          <div className='commentTop'>
            精彩评论
          </div>
          <div className='commentTip'>
            <ul>
              <li className='commentUser'>
                <div className='commentUserHead'>
                  <img className='commentUserImg' src='http://p3.music.126.net/nTK1OB1eoDtskW6PjVn5Fg==/2885118514391112.jpg?param=50y50'/>
                </div>
                <div className='commentInfo'>
                  <div  className='commentUserTip'>
                    <span className='commentUserName'>鸡犊情深：</span>
                    <span className='commentUserInfo'>校霸杏菜欺凌校草希文</span>
                  </div>
                  <div className='commentInfoDetail'>
                    <span className='commentTime'>2018年12月1日</span>
                    <div>
                      <span className='commentMsg'><Icon type="message" /></span>
                      <span className='commentLike'><Icon type="like" />(200)</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className='commentUser'>
                <div className='commentUserHead'>
                  <img className='commentUserImg' src='http://p3.music.126.net/nTK1OB1eoDtskW6PjVn5Fg==/2885118514391112.jpg?param=50y50'/>
                </div>
                <div className='commentInfo'>
                  <div  className='commentUserTip'>
                    <span className='commentUserName'>鸡犊情深：</span>
                    <span className='commentUserInfo'>校霸杏菜欺凌校草希文</span>
                  </div>
                  <div className='commentInfoDetail'>
                    <span className='commentTime'>2018年12月1日</span>
                    <div>
                      <span className='commentMsg'><Icon type="message" /></span>
                      <span className='commentLike'><Icon type="like" />(200)</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className='commentUser'>
                <div className='commentUserHead'>
                  <img className='commentUserImg' src='http://p3.music.126.net/nTK1OB1eoDtskW6PjVn5Fg==/2885118514391112.jpg?param=50y50'/>
                </div>
                <div className='commentInfo'>
                  <div  className='commentUserTip'>
                    <span className='commentUserName'>鸡犊情深：</span>
                    <span className='commentUserInfo'>校霸杏菜欺凌校草希文</span>
                  </div>
                  <div className='commentInfoDetail'>
                    <span className='commentTime'>2018年12月1日</span>
                    <div>
                      <span className='commentMsg'><Icon type="message" /></span>
                      <span className='commentLike'><Icon type="like" />(200)</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className='commentUser'>
                <div className='commentUserHead'>
                  <img className='commentUserImg' src='http://p3.music.126.net/nTK1OB1eoDtskW6PjVn5Fg==/2885118514391112.jpg?param=50y50'/>
                </div>
                <div className='commentInfo'>
                  <div  className='commentUserTip'>
                    <span className='commentUserName'>鸡犊情深：</span>
                    <span className='commentUserInfo'>校霸杏菜欺凌校草希文</span>
                  </div>
                  <div className='commentInfoDetail'>
                    <span className='commentTime'>2018年12月1日</span>
                    <div>
                      <span className='commentMsg'><Icon type="message" /></span>
                      <span className='commentLike'><Icon type="like" />(200)</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className='commentUser'>
                <div className='commentUserHead'>
                  <img className='commentUserImg' src='http://p3.music.126.net/nTK1OB1eoDtskW6PjVn5Fg==/2885118514391112.jpg?param=50y50'/>
                </div>
                <div className='commentInfo'>
                  <div  className='commentUserTip'>
                    <span className='commentUserName'>鸡犊情深：</span>
                    <span className='commentUserInfo'>校霸杏菜欺凌校草希文</span>
                  </div>
                  <div className='commentInfoDetail'>
                    <span className='commentTime'>2018年12月1日</span>
                    <div>
                      <span className='commentMsg'><Icon type="message" /></span>
                      <span className='commentLike'><Icon type="like" />(200)</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className='pageNum'><Pagination defaultCurrent={1} total={50} /></div>
          </div>
        </div>
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
    onlist: () => {
      dispatch(Actions.videoTitle());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoInfo);