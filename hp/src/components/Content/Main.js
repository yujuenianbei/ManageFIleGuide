import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
import Slider from "react-slick";
// import styles from './Main.module.less';
import './Main.css';
class Main extends Component {
    render() {
        var dots = [
            {
                title: "PAVILION星系列"
            },
            {
                title: "星14微边框轻薄本"
            },
            {
                title: "战66二代"
            },
            {
                title: "暗影精灵4代游戏本"
            },
        ]
        var settings = {
            customPaging: function(i) {
                return (
                  <a>
                    {dots[i].title}
                  </a>
                );
              },
              dots: true,
              dotsClass: "slick-dots slick-thumb",
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000
          };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/pavilon_0219_pc_nx.jpg" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/XINGPC-20190508.jpg" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/BannerZHAN66-20190426PC.jpg" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/20190403_nx.jpg" />
                    </div>
                </Slider>
            </div>
        );
    }
}
export default classify()(Main);