import React, { Component, Fragment } from 'react';
import Select from 'react-select'
import classify from '@magento/venia-concept/esm/classify';
import styles from './selectCity.module.less';

const selectStyle = {

}
class SelectCity extends Component {
    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]
        return (
            <Fragment>
                <div className={styles.selectCities}>
                    <Select
                        styles={selectStyle}
                        options={options}
                        label="请选择省份"
                    />
                </div>
                <div className={styles.selectCities}>
                    <Select
                        styles={selectStyle}
                        options={options}
                        label="请选择城市"
                    />
                </div>
                <div className={styles.selectCities}>
                    <Select
                        styles={selectStyle}
                        options={options}
                        label="请选择区/镇/县"
                    />
                </div>
            </Fragment>
        );
    }
}
export default classify(classify)(SelectCity);