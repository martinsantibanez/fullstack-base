const fs = require('fs')
const path = require('path')
const { override, babelInclude, addWebpackAlias } = require('customize-cra')

module.exports = override(
  babelInclude([path.resolve('src'), fs.realpathSync('../types')])
)
