let babel_env = process.env[
  "BABEL_ENV"
];
let loose = false,
  modules = false,
  useESModules = false;

switch (babel_env) {
  case "commonjs":
    loose = true;
    modules = "cjs";
    useESModules = false;
    break;
  case "es":
    loose = true;
    modules = false;
    useESModules = true;
    break;
  case "umd":
    loose = false;
    modules = false;
    useESModules = false;
    break;
}

const presets = [
  [
    "@babel/preset-env",
    {
      loose, modules
    }
  ]
];

const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-syntax-class-properties",
];

module.exports = {
  presets, plugins
};