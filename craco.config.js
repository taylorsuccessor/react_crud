const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@constants': path.resolve(__dirname, 'src/Constants'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@Layouts': path.resolve(__dirname, 'src/pages/Layouts'),

            '@Article': path.resolve(__dirname, 'src/pages/Article'),

        },
    },
};
