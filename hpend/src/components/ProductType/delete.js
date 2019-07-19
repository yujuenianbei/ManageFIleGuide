import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
import { getAllproductType, createProductType, updateProductType, deleteProductType, searchProductType, searchProductTypeTotal } from '../../fetch/productType'
import { timestampToTime, typeToTypeName } from '../../func/common'

let clearData;
class DeleteproductType extends PureComponent {

    componentDidMount() {
        this.props.onDel(this);
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        deleteProductType(this.props.state.productType.modelData, this.deleteFinish)
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
        if (result.data.deleteProductType.state === 1) {
            this.props.changeModleState(false);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            // 更新数据
            this.props.changeProductDataLoading(true);
            // 加载上一次的配置
            let data = {
                search: this.props.state.productType.searchValue ? this.props.state.productType.searchValue : "",
                searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
                pageSize: this.props.state.productType.pageSize,
                start: this.props.state.productType.pageNow,
                sort: this.props.state.productType.pageSort,
            };
            searchProductTypeTotal(data, this.setPageTotal);
            searchProductType(data, this.searchData);
        }
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalProductType.total)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        // 删除最后一条数据
        if (result.data.searchProductType.length === 0) {
            const pageNow = this.props.state.productType.pageNow - 1;
            this.props.changePageNow(pageNow);
            // 加载上一次的配置
            let data = {
                search: this.props.state.productType.searchValue ? this.props.state.productType.searchValue : "",
                searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
                pageSize: this.props.state.productType.pageSize,
                start: this.props.state.productType.pageNow,
                sort: this.props.state.productType.pageSort,
            };
            searchProductTypeTotal(data, this.setPageTotal)
            searchProductType(data, this.searchData);
        } else {
            let data = []
            result.data.searchProductType.map((item, index) => {
                return data[index] = {
                    key: item.id,
                    id: item.id,
                    typeName: item.typeName,
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
                <span>是否要删除 {this.props.state.productType.modelData.typeName} ？</span>
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
        changeModleState: (data) => { dispatch(Actions.productTypeModleState(data)); },
        changeProductDataLoading: (data) => { dispatch(Actions.productTypeDataLoading(data)); },
        changeProductData: (data) => { dispatch(Actions.productTypeData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productTypeModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.productTypeModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.productTypeModelData(data)); },
        changePageTotal: (data) => { dispatch(Actions.productTypePageTotal(data)); },
        changePageNow: (data) => { dispatch(Actions.productTypePageNow(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeleteproductType));