const path = require('path');
const withSass = require('@zeit/next-sass')

module.exports = withSass({
    webpack: (config, options) => {
        config.module = {
            ...config.module,
            noParse: /(mapbox-gl)\.js$/
        };
        config.resolve = {
            ...config.resolve,
            extensions: config.resolve.extensions.concat(['.scss']),
            modules: config.resolve.modules.concat([path.resolve(__dirname, "./styles")])
        };
        
        config.module.rules = config.module.rules.concat([{ test: /\.css/, use: [{ loader: 'css-loader' }] }])
        return config;
    },
    sassLoaderOptions: {
        sassOptions: {
            includePaths: [path.resolve(__dirname, './styles')]
        }
    }
});
