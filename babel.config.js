module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "mobx"],
  plugins: [
    "syntax-dynamic-import",
    // ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // "transform-decorators-legacy",
    [
      "babel-plugin-styled-components",
      {
        "displayName": true
      }
    ],
  ],
};