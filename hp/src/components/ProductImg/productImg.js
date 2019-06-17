import React, { Component } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import Slider from "react-slick";
import classify from '@magento/venia-concept/esm/classify';
import styles from './productImg.module.less';
import './productImg.css';
class ProductImg extends Component {
    render() {
        // console.log(this.props.match)
        var dots = [
            {
                src: this.props.state.product.productImg
            },
            {
                src: "https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/o/m/omen_0_700x700_3.jpg"
            },
            {
                src: "https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/2/_/2_1_2.png"
            },
            {
                src: "https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/3/_/3_2.png"
            },
            {
                src: "https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/4/_/4.jpg"
            }
        ]
        var settings = {
            customPaging: function (i) {
                return (
                        <img src={dots[i].src} alt="" />
                );
            },
            dots: true,
            dotsClass: "slick-pdots slick-pthumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000
        };
        return (
            <div className={styles.productListBanner + " productImg"}>
                <Slider {...settings}>
                    <div>
                        <img src={this.props.state.product.productImg} alt="" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/o/m/omen_0_700x700_3.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/2/_/2_1_2.png" alt="" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/3/_/3_2.png" alt="" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/4/_/4.jpg" alt="" />
                    </div>
                </Slider>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {}
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ProductImg));