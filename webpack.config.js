const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/content.js',
        output: {
            filename: 'content.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'source-map' : false,
        watch: isDevelopment,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/manifest.json', to: 'manifest.json' },
                ],
            }),
        ],
    };
};
