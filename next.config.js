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
            modules: config.resolve.modules.concat([path.resolve(__dirname, "./styles")])
        };
        return config;
    },
    // options: {
    //     includePaths: [
    //         path.resolve(__dirname, './styles'),
    //         path.resolve(__dirname, './node_modules')
    //     ],
    //     sourceMap: true,
    // }
});
