const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),    
    // addLessLoader({
    //     ident: 'postcss',
    //     javascriptEnabled: true,
    //     modifyVars: { '@primary-color': '#0199d5' },
    //     localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
    // }),
    // addLessLoader({ localIdentName: '[local]--[hash:base64:5]' })
);