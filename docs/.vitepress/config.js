const dayjs = require('dayjs');

module.exports = {
  title: 'ReactHandson',
  // base: '/react_handson/',
  themeConfig: {
    domain: 'https://react-handson-vite.ozaki25.vercel.app',
    repo: 'ozaki25/react_handson_vite',
    repoLabel: 'GitHub',
    sidebar: [
      { text: '1.開発環境構築', link: '/1_setup' },
      { text: '2.雛形の整理', link: '/2_initialfile' },
      { text: '3.HelloWorld編', link: '/3_hello' },
      { text: '4.Counter編', link: '/4_counter' },
      { text: '5.TodoList編', link: '/5_todolist' },
      { text: '6.ページ遷移編', link: '/6_routing' },
      { text: '7.通信処理編', link: '/7_communication' },
    ],
    lastUpdated: true,
  },
  markdown: {
    lineNumbers: true,
  },
};
