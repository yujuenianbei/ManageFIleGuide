import './play.less';
import React from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';

class Tip extends React.Component {
  constructor() {
    super();
    this.state= {

    }
  }
  render() {
    return (
      this.props.volume &&
      <div style={{display:'block'}}>
        {this.props.volume}
      </div>
    )
  }
}

export default Tip;