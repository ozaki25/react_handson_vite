module.exports = {
  title: 'ReactHandson',
  // base: '/react_handson/',
  themeConfig: {
    sidebar: [
      '/1_setup',
      '/2_initialfile',
      '/3_hello',
      '/4_counter',
      '/5_todolist',
      '/6_routing',
      '/7_communication',
    ],
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true,
    },
    '@vuepress/google-analytics': {
      ga: 'UA-127308140-3',
    },
  },
  head: [['link', { rel: 'manifest', href: '/manifest.json' }]],
};
