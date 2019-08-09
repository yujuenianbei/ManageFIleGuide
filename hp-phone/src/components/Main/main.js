import React, { Fragment, PureComponent } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import { Link, withRouter } from 'react-router-dom';
import styles from './main.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThLarge, faShoppingCart, faUser, } from '@fortawesome/fontawesome-free-solid'

class Main extends PureComponent {
  state = {
    nav: [
      {
        icon: faHome,
        text: "首页",
        link: '/home'
      },
      {
        icon: faThLarge,
        text: "分类",
        link: '/classify'
      },
      {
        icon: faShoppingCart,
        text: "购物车",
        link: '/cart'
      },
      {
        icon: faUser,
        text: "用户",
        link: '/user'
      }
    ],
    activeNav: 0
  }
  // 切换class
  changeClass = (index) => {
    this.setState({ activeNav: index })
  }
  render() {
    return (
      <div className={styles.bottom}>
        <ul>
          {this.state.nav.map((item, index) => {
            return <li className={item.link === this.props.match.path ? styles.navIcon + ' ' + styles.li : styles.li}>
              <Link to={item.link} onClick={() => this.changeClass(index)}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.text}</span>
              </Link>
            </li>
          })}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(classify(styles)(Main)));