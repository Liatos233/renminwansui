const {
  override,
  fixBabelImports,
  addWebpackPlugin,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require("customize-cra");

const addLessLoader = require("customize-cra-less-loader");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

function resolve(pathUrl) {
  const path = require("path");
  return path.join(__dirname, pathUrl);
}

const addCustomize = () => (config) => {
  // 配置打包后的文件位置
  config.output.path = resolve("build");
  //  配置 publicPath。这里设置为 "/",表示资源请求的基础路径是网站根目录
  if (config.output.publicPath) {
    config.output.publicPath = "/";
  }

  // webpack 可以解析指定拓展名的文件
  if (config.resolve) {
    config.resolve.extensions = [".js", ".tsx", ".less", ".css"];
  }

  // 添加js、css打包gzip配置
  config.plugins.push(
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$/,
      threshold: 1024,
    })
  );

  return config;
};

// 设置代理
// const devServerConfig = () => (config) => {
//   return {
//     ...config,
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:8000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   };
// };

// 关掉 sourceMap
process.env.GENERATE_SOURCEMAP = isProduction ? "false" : "true";

module.exports = {
  webpack: override(
    // 判断环境，只有在生产环境的时候才去使用这个插件
    isProduction &&
      addWebpackPlugin(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
        })
      ),

    // 配置antd按需引入
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true, // 自动打包相关的样式
    }),

    // 配置路径别名
    addWebpackAlias({ "@": resolve("src") }),

    // 支持装饰器
    addDecoratorsLegacy(),

    // 添加自定义配置
    addCustomize(),

    //less-loader6.x配置
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#1DA57A" },
      },
    })
  ),

  // 本地启动配置，可以设置代理
  // 先不使用
  // devServer: overrideDevServer(devServerConfig()),
};
