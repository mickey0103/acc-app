const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: [
      /.*\/__tests__\/.*/,
      /.*\/\.test\.(js|ts|tsx)$/,
      /.*\/\.spec\.(js|ts|tsx)$/,
    ],
  },
  watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

