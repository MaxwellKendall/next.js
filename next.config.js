const path = require('path');
const withSass = require('@zeit/next-sass');

const paths = {
    usas_deps: "./usaspending-website/node_modules",
    usas_js: "./usaspending-website/src/js",
    usas_styles: "./usaspending-website/src/_scss",
    usas_root: "./usaspending-website/src"
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
                path.resolve(__dirname, paths.usas_deps),
                path.resolve(__dirname, paths.usas_js),
                path.resolve(__dirname, paths.usas_styles),
                path.resolve(__dirname, paths.usas_root)
            ])
        };
        
        config.module.rules = config.module.rules
            .map((rule) => {
                if (String(rule.test).includes('js')) {
                    return {
                        ...rule,
                        include: rule.include.concat([path.resolve(__dirname, paths.usas_deps)])
                    };
                }
                return rule;
            })
            .concat([{ test: /\.css/, use: [{ loader: 'css-loader' }] }])
        
        return config;
    },
    sassLoaderOptions: {
        sassOptions: {
            includePaths: [path.resolve(__dirname, paths.usas_styles)]
        }
    }
});
