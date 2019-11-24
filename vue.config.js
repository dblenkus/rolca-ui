module.exports = {
  lintOnSave: false,
  devServer: {
    progress: false,
    watchOptions: {
      // Ignore node_modules inside the Docker container.
      ignored: ['/node/node_modules']
    }
  },
  transpileDependencies: ['vuetify']
}
