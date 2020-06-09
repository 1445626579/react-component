const postcssNormalize = require('postcss-normalize');
const pxtorem = require("postcss-pxtorem");
const webpack = require('webpack');
const path = require('path');
const paths = require('react-scripts/config/paths');
const providePlugin = new webpack.ProvidePlugin({
  _get: ['loadsh', 'get'],
  apis: 'apis'
})
module.exports = {
  webpack (config, env) {
    if (env === "production") {

      // var publicPath = "";
      // if (process.env.REACT_APP_NODE_ENV === "test") {
      //   publicPath = "//h5cdn.1.babytree-test.com/h5_babybox_activity/";
      // }
      // if (process.env.REACT_APP_NODE_ENV === "pre") {
      //   publicPath = "//h5cdn.babytree-pre.com/h5_babybox_activity/";
      // }
      // if (process.env.REACT_APP_NODE_ENV === "prod") {
      //   publicPath = "//h5cdn.babytreeimg.com/h5_babybox_activity/";
      // }
      //修改public目录内的内容输出地址
      paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
      config.output = {
        ...config.output,
        //publicPath,
        path: __dirname + '/dist',
        filename: `static/js/[name].[contenthash:8].js`,
        chunkFilename: `static/js/[name].[contenthash:8].chunk.js`
      };
      config.plugins[5].options.filename = `static/css/[name].[contenthash:8].css`;
      config.plugins[5].options.chunkFilename = `static/css/[name].[contenthash:8].chunk.css`;
      config.module.rules[2].oneOf[0].options.name = `static/img/[name].[hash:8].[ext]`;
      config.module.rules[2].oneOf[7].options.name = `static/img/[name].[hash:8].[ext]`;
    }
    for (let i = 3; i < 7; i++) {
      config.module.rules[2].oneOf[i].use[2].options.plugins = () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        pxtorem({
          replace: true,
          rootValue: 100,
          propWhiteList: []
        })
        , postcssNormalize(),
      ]
    }
    //设置资源路径别名
    const ALIAS = {
      "@": path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/view/images'),
    }
    Object.keys(ALIAS).forEach(key => {
      config.resolve.alias[key] = ALIAS[key];
    })
    // console.log(config)
    return config;
  }
}