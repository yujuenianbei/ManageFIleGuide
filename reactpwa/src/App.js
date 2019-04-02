import React, { Component } from 'react';
import './App.less';
import { connect } from 'react-redux';
import Bottom from './layout/Bottom/index';
import Main from './main';


class App extends Component {
  componentDidMount() {
    console.log(this.props.page.Bottom)
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.page.Bottom !== this.props.page.Bottom && !this.props.page.Bottom) {
      console.log(this.props.page.Bottom, nextProps.page.Bottom)
      return true
    } else {
      return false
    }
  }
  render() {
    console.log(1)
    return (
      <div>
        <Main />
        {
          (this.props.page.Bottom.pageIndex === 'home' ||
          this.props.page.Bottom.pageIndex === 'news' ||
          this.props.page.Bottom.pageIndex === 'state' ||
          this.props.page.Bottom.pageIndex === 'user' ||
          this.props.page.Bottom.pageIndex === 'setting' ) && <Bottom />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state
  }
}
const mapDisatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDisatchToProps)(App);
