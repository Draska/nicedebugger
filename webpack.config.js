var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    
// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

var options = {
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    options: path.join(__dirname, "src", "js", "options.js"),
    background: path.join(__dirname, "src", "js", "background.js"),
    //devtools: path.join(__dirname, "src", "js", "devtools.js"),
    //devpage: path.join(__dirname, "src", "js", "devpage.js")
  },
  chromeExtensionBoilerplate: {
    //notHotReload: ["content.big.js", "jquery-3.1.1.min"]
  },  
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'ignore-loader' },      
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  
  resolve: {
    alias: alias,
    extensions: fileExtensions.map(extension => ("." + extension)).concat([".jsx", ".js", ".css"])
  },
  plugins: [
    new CopyWebpackPlugin([ 
        // Copy directory contents to {output}/to/directory/
        { from: 'src/css', to: 'css' },
        { from: 'src/img', to: 'img' },
        //{ from: 'src/js/libraries', to: 'libraries' },   
        { from: 'src/js', to: 'js' },
      ], {
          ignore: [],
          copyUnmodified: true
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"]
    }),
    /* new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "devtools.html"),
      filename: "devtools.html",
      chunks: ["devtools"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "devpage.html"),
      filename: "devpage.html",
      chunks: ["devpage"]
    }), */
    new WriteFilePlugin()
  ]
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
