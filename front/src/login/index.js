import React, { Component } from 'react';
import * as Actions from './redux/action'
import { connect } from 'react-redux';
import Main from '../main';
import PlayerIndex from '../play/playerIndex'
import Login from './login'
import Right from '../right/chat/index';
class LoginMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowH: document.body.clientHeight,
      windowW: document.body.clientWidth
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize = () => {
    this.setState({windowH: document.body.clientHeight, windowW: document.body.clientWidth})
    console.log(this.state)
    if(this.state.windowW < 1140) {
      console.log(1)
      // window.resizeTo(this.state.windowH,1140); 
      window.resizeTo(800,600)
    }
  }
  render() {
    return (
      <div>
        {!!localStorage.getItem('token') ?
          <div>
            <Main />
            <PlayerIndex />
            <Right />
          </div> :
          <div className='loginCover' ref="cover" >
            <Login />
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}
export default connect(mapStateToProps)(LoginMain);