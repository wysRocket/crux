const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable the new architecture
config.resolver.sourceExts.push('cjs');
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
