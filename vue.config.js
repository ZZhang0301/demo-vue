module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://sider.ai',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  };
  