module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // React 18 compatibility
      "react-native-reanimated/plugin", // Must be last
    ],
  };
};
