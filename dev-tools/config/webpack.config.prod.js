const config = require('./config')
module.exports = require('./webpack.config.base')(config.BuildType.PRODUCTION)
