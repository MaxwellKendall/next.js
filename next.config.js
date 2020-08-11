const path = require('path');
const withSass = require('@zeit/next-sass');

const paths = {
    root: "./",
    usas: "./usaspending-website/src",
    styles: "./usaspending-website/src/_scss",
    js: "./usaspending-website/src/js"
}

module.exports = withSass({
    webpack: (config, options) => {
        config.module = {
            ...config.module,
            noParse: /(mapbox-gl)\.js$/
        };
        config.resolve = {
            ...config.resolve,
            extensions: config.resolve.extensions.concat(['.scss']),
            modules: config.resolve.modules.concat([
                path.resolve(__dirname, paths.styles),
                path.resolve(__dirname, paths.js),
                path.resolve(__dirname, paths.root),
                path.resolve(__dirname, paths.usas)
            ])
        };
        
        config.module.rules = config.module.rules.concat([{ test: /\.css/, use: [{ loader: 'css-loader' }] }])
        return config;
    },
    sassLoaderOptions: {
        sassOptions: {
            includePaths: [path.resolve(__dirname, paths.styles)]
        }
    }
});
