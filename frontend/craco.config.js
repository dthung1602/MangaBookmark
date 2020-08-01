const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#00bea6",
              "@link-color": "#00bea6",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
