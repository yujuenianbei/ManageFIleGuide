import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { getUserInfo, deleteAccount } from '../../fetch/account'


let clearData;
class DeleteAccount extends PureComponent {

    componentDidMount(){
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
        if(result.data.deleteAccount[0].state === 1){
            this.props.changeModleState(false);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            // 更新数据
            this.props.changeAccountDataLoading(true);
            getUserInfo(this.props.setData);
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
        changeModleState: (data) => { dispatch(Actions.modleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.accountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.accountData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.modleName(data)); },
        changeModelData: (data) => { dispatch(Actions.modelData(data)); },  
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeleteAccount));