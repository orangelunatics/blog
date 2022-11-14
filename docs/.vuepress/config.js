module.exports = {
  // theme: 'vuepress-theme-maker',
  theme: 'yuu',
  base: '/blog/',
  title: 'Nav1🪐',
  description: 'navi的个人blog',
  head: [
    ['meta', { name: 'author', content: 'navi' }],
    ['meta', { name: 'keywords', content: 'navi' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
      { text: '项目', link: '/project/' },
      {
        text: '前端',
        items: [
          {
            text: '基础',
            items: [
              { text: 'HTML + CSS', link: '/H5/' },
              { text: 'JS + TS', link: '/JavaScript/' },
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
              { text: 'Vu响应式原理', link: '/Vue/Vue-reactive/' },
              { text: 'nectTick的原理', link: '/Vue/Vue-nextTick/' },
            ],
          },
          {
            text: 'React',
            items: [{ text: 'React', link: '/React/' }],
          },
        ],
      },
      { text: 'Node.js', link: '/node/' },
      { text: '网络', link: '/network/' },
      { text: '算法', link: '/algorithm/' },
      { text: 'CS课程', link: '/cs/' },
      {
        text: 'MissyPeng',
        items: [
          {
            text: '技术文档',
            items: [
              {
                text: '十分钟让你学会本地git配置以及gitlab、github开发环境配置',
                link: '/pengpeng/gitConfig/',
              },
            ],
          },
          {
            text: 'TS体操练习',
            link: '/pengpeng/typeChallenge/',
          },
        ],
      },
      { text: '其他', link: '/others/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: 'auto',
  },
};
