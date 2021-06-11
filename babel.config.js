module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    ["zent"],
    "syntax-dynamic-import",
    [
      "babel-plugin-styled-components",
      {
        "displayName": true
      }
    ],
  ],
};