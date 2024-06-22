module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@theme": "./src/theme",
            '@pages': './src/pages',
            '@components': './src/components',
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
