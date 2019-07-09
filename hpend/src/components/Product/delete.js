import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
import { deleteProduct, searchProduct, searchProductTotal } from '../../fetch/product'
import { timestampToTime, typeToTypeName } from '../../func/common'

let clearData;
class DeleteProduct extends PureComponent {

    componentDidMount() {
        this.props.onDel(this);
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        deleteProduct(this.props.state.product.modelData, this.deleteFinish)
    };

    // 取消提交
    cancelSubmit = () => {
        this.props.changeModleState(false);
        clearData = setTimeout(() => {
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            clearTimeout(clearData)
        }, 0);
    }

    // 提交数据后返回
    deleteFinish = (result) => {
        // 根据接口返回状态判断成功与否
        if (result.data.deleteProduct.state === 1) {
            this.props.changeModleState(false);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            // 更新数据
            this.props.changePoductDataLoading(true);
            // 加载上一次的配置
            let searchValue;
            if (this.props.state.product.searchType === 'type' && !!this.props.state.product.searchValue) {
                searchValue = JSON.stringify(this.props.state.product.productTypeList.filter(item => item.typeName === this.props.state.product.searchValue)[0].id);
            } else {
                searchValue = this.props.state.product.searchValue
            }
            let data = {
                search: this.props.state.product.searchValue ? searchValue : "",
                searchType: this.props.state.product.searchType ? this.props.state.product.searchType : "",
                pageSize: this.props.state.product.pageSize,
                start: this.props.state.product.pageNow,
                sort: this.props.state.product.pageSort,
            };
            searchProductTotal(data, this.setPageTotal);
            searchProduct(data, this.searchData);
        }
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalProduct.total)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        // 删除最后一条数据
        if (result.data.searchProduct.length === 0) {
            const pageNow = this.props.state.Product.pageNow - 1;
            this.props.changePageNow(pageNow);
            // 加载上一次的配置
            let searchValue;
            if (this.props.state.product.searchType === 'type' && !!this.props.state.product.searchValue) {
                searchValue = JSON.stringify(this.props.state.product.productTypeList.filter(item => item.typeName === this.props.state.product.searchValue)[0].id);
            } else {
                searchValue = this.props.state.product.searchValue
            }
            let data = {
                search: this.props.state.product.searchValue ? searchValue : "",
                searchType: this.props.state.product.searchType ? this.props.state.product.searchType : "",
                pageSize: this.props.state.product.pageSize,
                start: this.props.state.product.pageNow,
                sort: this.props.state.product.pageSort,
            };
            searchProductTotal(data, this.setPageTotal)
            searchProduct(data, this.searchData);
        } else {
            let data = []
            result.data.searchProduct.map((item, index) => {
                return data[index] = {
                    key: item.id,
                    productName: item.productName,
                    type: typeToTypeName(this.props.state.product.productTypeList, item.type),
                    img: item.img,
                    featrues: item.featrues,
                    promotionMessage: item.promotionMessage,
                    promotionMessageSecond: item.promotionMessageSecond,
                    usedPrice: item.usedPrice,
                    nowPrice: item.nowPrice,
                    createTime: timestampToTime(parseInt(item.createTime)),
                    updateTime: timestampToTime(parseInt(item.updateTime)),
                }
            })
            this.props.changeProductData(data)
            this.props.changeProductDataLoading(false)
        }
    }



    render() {
        return (
            <div>
                <span>是否要删除 {this.props.state.product.modelData.productName} ？</span>
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
    return {
        changeModleState: (data) => { dispatch(Actions.productModleState(data)); },
        changeProductDataLoading: (data) => { dispatch(Actions.productDataLoading(data)); },
        changeProductData: (data) => { dispatch(Actions.productData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.productModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.productModelData(data)); },
        changePageTotal: (data) => { dispatch(Actions.productPageTotal(data)); },
        changePageNow: (data) => { dispatch(Actions.productPageNow(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeleteProduct));