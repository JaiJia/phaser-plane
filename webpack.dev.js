const _ = require('lodash');
const common = require('./webpack.common.js');

module.exports = _.merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist'
    },
});