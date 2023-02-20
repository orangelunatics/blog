module.exports = {
  // theme: 'vuepress-theme-maker',
  theme: 'yuu',
  base: '/blog/',
  title: 'Nav1🪐',
  description: 'navi的个人blog',
  head: [
    ['meta', { name: 'author', content: 'navi' }],
    ['meta', { name: 'keywords', content: 'navi' }],
    [
      'link',
      {
        rel: 'icon',
        href:
          'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎄</text></svg>',
      },
    ],
  ],
  plugins: [
    'go-top',
    [
      '@xiaopanda/vuepress-plugin-code-copy',
      {
        buttonStaticIcon: true,
        buttonIconTitle: 'copy一下',
        buttonAlign: 'bottom',
        buttonColor: '#33FF48',
      },
    ],
    'vuepress-plugin-baidu-autopush',
  ],
  themeConfig: {
    yuu: {
      defaultDarkTheme: false,
    },
    lastUpdated: 'Last Updated',
    logo: '/assets/img/hero.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'intro', link: '/introduction/' },
      { text: '杂项', link: '/project/' },
      {
        text: '前端',
        items: [
          {
            text: '基础',
            items: [
              { text: 'HTML + CSS', link: '/H5/' },
              { text: 'JS + TS', link: '/JavaScript/' },
              { text: 'JS继承', link: '/extends/' },
            ],
          },
          {
            text: 'Vue',
            items: [
              { text: 'Vue', link: '/Vue/Vue/' },
              { text: 'Vue插槽浅析', link: '/Vue/Vue-slot/' },
              { text: '在Vue中使用混入mixin', link: '/Vue/Vue-mixin/' },
              { text: '如何在控制台中调用Vue开发者工具', link: '/Vue/Vue-devtools/' },
              { text: 'Vue3基础', link: '/Vue/Vue3/' },
              { text: 'Vue响应式原理', link: '/Vue/Vue-reactive/' },
              { text: 'nectTick的原理', link: '/Vue/Vue-nextTick/' },
              { text: 'Vue.component与Vue.extend', link: '/Vue/Vue-component/' },
              { text: 'diff算法的不断优化', link: '/Vue/Vue-diff/' },
            ],
          },
          {
            text: 'React',
            items: [
              { text: 'React', link: '/React/React/' },
              { text: 'React生命周期', link: '/React/React-life/' },
              { text: 'mobx', link: '/React/mobx/' }, 
            ],
          },
          {
            text: '小程序',
            items: [{ text: 'miniprogram', link: '/miniprogram/' }],
          },
        ],
      },
      {
        text: '工程化',
        items: [
          {
            text: 'Node.js',
            items: [{ text: '基础', link: '/node/base/' }],
          },
          {
            text: 'webpack',
            items: [
              { text: 'webpack基础', link: '/webpack/base/' },
              { text: 'webpack分包', link: '/webpack/split/' },
            ],
          },
        ],
      },
      { text: '网络', link: '/network/' },
      { text: '算法', link: '/algorithm/' },
      { text: 'CS课程', link: '/cs/' },
      // {
      //   text: 'MissyPeng',
      //   items: [
      //     {
      //       text: '技术文档',
      //       items: [
      //         {
      //           text: '十分钟让你学会本地git配置以及gitlab、github开发环境配置',
      //           link: '/pengpeng/gitConfig/',
      //         },
      //       ],
      //     },
      //     {
      //       text: 'TS体操练习',
      //       link: '/pengpeng/typeChallenge/',
      //     },
      //   ],
      // },
      { text: '其他', link: '/others/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: 'auto',
  },
};
