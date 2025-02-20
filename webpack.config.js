const path = require('path');

module.exports = {
    entry: './views/index.jsx', // Entry point for React client-side
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js', // Output file
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};