const ENVPATH = '/home/manos';
const DOCPATH = __dirname + '/dist';
const COREPATH = ENVPATH + '/Desktop/devenv/reactbundle-core';
const COMPONENTS = ENVPATH + '/Desktop/devenv/reactbundle/src/components';


//Bill paths
// const ENVPATH = 'C:/Users/admin/projects/compare';
// const COREPATH = ENVPATH + '/reactbundle-core';
// const COMPONENTS = ENVPATH + '/reactbundle/src/components';


const path = require('path');

module.exports = {

    devServer: {
        contentBase: DOCPATH,
        compress: true,
        port: 3000
    },

    resolve: {
        alias: {
            _coreutils: COREPATH + '/utilities',
            _coregraphs: COREPATH + '/graphics',
            _components: COMPONENTS,
            _src: path.resolve(__dirname, 'src'),
        }
    },

    output: {
        // filename: WIDGET,
        // contentBase: __dirname + '/dist',
        path: DOCPATH,
        // publicPath: WEBPATH,
        jsonpFunction: 'jsonpAppBookstore'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    }
};

