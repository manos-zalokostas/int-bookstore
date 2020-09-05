const ENVPATH = '/home/manos';
const DOCPATH = __dirname + '/dist';


const path = require('path');

module.exports = {

    devServer: {
        contentBase: DOCPATH,
        compress: true,
        port: 3000
    },

    resolve: {
        alias: {
            _src: path.resolve(__dirname, 'src'),
        }
    },

    output: {
        path: DOCPATH,
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

