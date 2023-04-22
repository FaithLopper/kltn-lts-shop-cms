const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#111111",
              "@font-size-base": "16px",
              '@border-radius-base': '5px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
