const _ = require('lodash');
const common = require('./webpack.common.js');

module.exports = _.merge(common, {
    mode: 'production',
    devtool: 'source-map',
});