const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    // eslint-disable-next-line
    config.node = {
      fs: 'empty',
    };

    return config;
  },
});

// module.exports = withCSS({/* my next config */})
