module.exports = {
  title: 'ReactHandson',
  // base: '/react_handson/',
  themeConfig: {
    domain: 'https://react-handson.ozaki25.now.sh',
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
  markdown: {
    lineNumbers: true,
  },
  plugins: {
    '@vuepress/back-to-top': {},
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true,
    },
    '@vuepress/google-analytics': {
      ga: 'UA-127308140-3',
    },
    'seo': {
      image: ($page, $site) => `${$site.domain}/logo.png`,
    },
  },
  head: [['link', { rel: 'manifest', href: '/manifest.json' }]],
};
