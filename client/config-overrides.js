// When changing this file, you must restart WBS
const tsImportPluginFactory = require("ts-import-plugin");
const { getLoader } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    (rule) =>
      rule.loader &&
      typeof rule.loader === "string" &&
      rule.loader.includes("ts-loader"),
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryDirectory: "es",
          libraryName: "antd",
          style: true,
        }),
      ],
    }),
  };

  // Override theme here
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@component-background": "#FFFFFF",
      "@info-color": "#FFFFFF",
      "@primary-color": "#5A1807",
      "@text-color": "#000000",

      // Layout
      "@layout-body-background": "#ffffff",
      "@layout-header-background": "#252525",
      "@layout-trigger-background": "#5A1807",

      // Menu Items
      "@menu-item-color": "#FFFFFF",
    },
  })(config, env);

  return config;
};
