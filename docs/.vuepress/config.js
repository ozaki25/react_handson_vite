const dayjs = require('dayjs');

module.exports = {
  title: 'ReactHandson',
  // base: '/react_handson/',
  themeConfig: {
    domain: 'https://react-handson.ozaki25.now.sh',
    repo: 'ozaki25/react_handson',
    repoLabel: 'GitHub',
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
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        return dayjs(timestamp).format('YYYY/MM/DD');
      },
    },
    '@vuepress/back-to-top': {},
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true,
    },
    '@vuepress/google-analytics': {
      ga: 'UA-127308140-3',
    },
    seo: {
      description: () => 'ハンズオン資料',
    },
  },
  head: [['link', { rel: 'manifest', href: '/manifest.json' }]],
};
