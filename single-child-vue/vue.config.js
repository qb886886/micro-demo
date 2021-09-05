module.exports = {
  chainWebpack: conf => {
    conf.externals(['vue', 'vue-router', 'vuex'])
  }
}
