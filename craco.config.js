/* eslint-disable  @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@type': path.resolve(__dirname, 'src/type/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
};
