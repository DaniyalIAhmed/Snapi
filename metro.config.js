const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// React 18 compatibility fixes
config.resolver.unstable_enableSymlinks = false;
config.resolver.unstable_enablePackageExports = false;

// Better caching for production builds
config.resetCache = true;

module.exports = config;
