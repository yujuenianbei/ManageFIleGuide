import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { deleteAccount, searchAccount, searchAccountTotal } from '../../fetch/account'
import { transToSex } from '../../func/account'


let clearData;
class DeleteAccount extends PureComponent {

    componentDidMount() {
        this.props.onDel(this);
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        deleteAccount(this.props.state.account.modelData, this.deleteFinish)
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
        if (result.data.deleteAccount[0].state === 1) {
            this.props.changeModleState(false);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            // 更新数据
            this.props.changeAccountDataLoading(true);

            // 加载上一次的配置
            let data = {};
            data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
            data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
            data.pageSize = this.props.state.account.pageSize;
            data.start = this.props.state.account.pageNow;
            data.sort = this.props.state.account.pageSort;
            // 如果搜索性别需要装换
            if (data.searchType === "sex") {
                data.search = transToSex(this.props.state.account.searchValue);
            }
            searchAccountTotal(data, this.setPageTotal)
            searchAccount(data, this.searchData);
        }
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.total.total)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        // 删除最后一条数据
        if (result.data.searchAccount.length === 0) {
            const pageNow = this.props.state.account.pageNow - 1;
            this.props.changePageNow(pageNow);

            // 加载上一次的配置
            let data = {};
            data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
            data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
            data.pageSize = this.props.state.account.pageSize;
            data.start = pageNow;
            data.sort = this.props.state.account.pageSort;
            // 如果搜索性别需要装换
            if (data.searchType === "sex") {
                data.search = transToSex(this.props.state.account.searchValue);
            }
            searchAccountTotal(data, this.setPageTotal)
            searchAccount(data, this.searchData);
        } else {
            let data = []
            result.data.searchAccount.map((item, index) => (
                data[index] = {
                    key: item.id,
                    userName: item.userName,
                    sex: item.sex,
                    email: item.email,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    phoneCode: item.phoneCode,
                    phone: item.phone,
                    company: item.company,
                    password: item.password,
                }
            ))
            this.props.changeAccountData(data)
            this.props.changeAccountDataLoading(false)
        }
    }



    render() {
        return (
            <div>
                <span>是否要删除 {this.props.state.account.modelData.userName} 用户？</span>
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
        changeModleState: (data) => { dispatch(Actions.accountModleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.accountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.accountData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.accountModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.accountModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.accountModelData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.accountModleTitle(data)); },
        changePageTotal: (data) => { dispatch(Actions.accountPageTotal(data)); },
        changePageNow: (data) => { dispatch(Actions.accountPageNow(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeleteAccount));