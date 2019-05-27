import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListMain.module.less';
import { Link } from 'react-router-dom';
import ProductInfo from '../ProductListInfo/index'
import Data from '../../data/main'
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const GET_MAINPRODUCTLIST = gql`
query productListInfoOne($id: Int!){
    productListInfoOne(id: $id){
        id
        link
        img
        productName
        promotionMessage
        featrues
        promotionMessageSecond
        usedPrice
        nowPrice
  }
}`;

class ProductListMain extends Component {
    render() {
        const datas = this.props.category
        console.log(datas)
        return (
            <div className={styles.container}>
                <ul>
                    <li>
                        <Link to={datas.link}>
                            <img className={styles.productAdds} src={datas.img} alt={datas.title}></img>
                        </Link>
                    </li>
                    <Query query={GET_MAINPRODUCTLIST}  variables={{ id: parseInt(datas.id) }}>
                        {({ loading, error, data, refetch }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            return data.productListInfoOne.map((item, index) => {
                                return <li key={index + "mainProductListInfoOne"}>
                                    <ProductInfo
                                        id={item.id}
                                        link={item.link}
                                        img={item.img}
                                        productName={item.productName}
                                        promotionMessage={item.promotionMessage}
                                        featrues={item.featrues}
                                        promotionMessageSecond={item.promotionMessageSecond}
                                        usedPrice={item.usedPrice}
                                        nowPrice={item.nowPrice}
                                    />
                                </li>
                            })
                        }}
                    </Query>
                </ul>
            </div>
        );
    }
}
export default classify(classify)(ProductListMain);