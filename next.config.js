const path = require('path');
const withSass = require('@zeit/next-sass')

module.exports = {
    webpack: (
        config,
        options
    ) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            Components: path.resolve(__dirname, 'Components/'),
            Containers: path.resolve(__dirname, 'containers/'),
            Helpers: path.resolve(__dirname, 'helpers/'),
            Redux: path.resolve(__dirname, 'redux/'),
            Models: path.resolve(__dirname, 'models/'),
            Pages: path.resolve(__dirname, 'styles/pages'),
            GlobalConstants: path.resolve(__dirname, './GlobalConstants'),
            DataMapping: path.resolve(__dirname, './dataMapping/'),
        }
        config.module = {
            ...config.module,
            noParse: /(mapbox-gl)\.js$/
        };
        const sassRules = withSass({}).webpack(config, options).module.rules;
        config.module.rules = sassRules;
        return config;
    }
};