const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),    
    addLessLoader({
        // javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#0197d6' },
        localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
    }),
    addLessLoader({ localIdentName: '[local]--[hash:base64:5]' })
);