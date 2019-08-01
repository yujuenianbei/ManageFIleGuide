import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './frontUser.module.less';
import { deleteFrontUser, searchFrontUser, searchFrontUserTotal } from '../../fetch/frontUser';
import { transToSex } from '../../func/account'


let clearData;
class DeleteFrontUser extends PureComponent {

    componentDidMount() {
        this.props.onDel(this);
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        deleteFrontUser(this.props.state.frontUser.modelData, this.deleteFinish)
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
        if (result.data.deleteFrontUser[0].state === 1) {
            this.props.changeModleState(false);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            // 更新数据
            this.props.changeFrontUserDataLoading(true);

            // 加载上一次的配置
            let data = {};
            data.search = this.props.state.frontUser.searchValue ? this.props.state.frontUser.searchValue : ""
            data.searchType = this.props.state.frontUser.searchType ? this.props.state.frontUser.searchType : "";
            data.pageSize = this.props.state.frontUser.pageSize;
            data.start = this.props.state.frontUser.pageNow;
            data.sort = this.props.state.frontUser.pageSort;
            // 如果搜索性别需要装换
            if (data.searchType === "sex") {
                data.search = transToSex(this.props.state.frontUser.searchValue);
            }
            searchFrontUserTotal(data, this.setPageTotal)
            searchFrontUser(data, this.searchData);
        }
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.frontUserTotal.total)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        // 删除最后一条数据
        if (result.data.searchFrontUser.length === 0) {
            const pageNow = this.props.state.frontUser.pageNow - 1;
            this.props.changePageNow(pageNow);

            // 加载上一次的配置
            let data = {};
            data.search = this.props.state.frontUser.searchValue ? this.props.state.frontUser.searchValue : ""
            data.searchType = this.props.state.frontUser.searchType ? this.props.state.frontUser.searchType : "";
            data.pageSize = this.props.state.frontUser.pageSize;
            data.start = pageNow;
            data.sort = this.props.state.frontUser.pageSort;
            // 如果搜索性别需要装换
            if (data.searchType === "sex") {
                data.search = transToSex(this.props.state.frontUser.searchValue);
            }
            searchFrontUserTotal(data, this.setPageTotal)
            searchFrontUser(data, this.searchData);
        } else {
            let data = []
            result.data.searchFrontUser.map((item, index) => (
                data[index] = {
                    key: item.id,
                    name: item.name,
                    sex: item.sex,
                    email: item.email,
                    phoneCode: item.phoneCode,
                    phone: item.phone,
                    company: item.company,
                    password: item.password,
                }
            ))
            this.props.changeFrontUserData(data)
            this.props.changeFrontUserDataLoading(false)
        }
    }



    render() {
        return (
            <div>
                <span>是否要删除 {this.props.state.frontUser.modelData.name} 用户？</span>
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
        changeModleState: (data) => { dispatch(Actions.frontUserModleState(data)); },
        changeFrontUserDataLoading: (data) => { dispatch(Actions.frontUserDataLoading(data)); },
        changeFrontUserData: (data) => { dispatch(Actions.frontUserData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.frontUserModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.frontUserModelData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
        changePageTotal: (data) => { dispatch(Actions.frontUserPageTotal(data)); },
        changePageNow: (data) => { dispatch(Actions.frontUserPageNow(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeleteFrontUser));