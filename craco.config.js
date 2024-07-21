/* eslint-disable  @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@type': path.resolve(__dirname, 'src/type/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
};
