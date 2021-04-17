module.exports = {
  base: "/blog/",
  title: "Chase the Truth 🙏🏻",
  description: "navi的个人blog",
  head: [
    ['meta', { name: 'author', content: 'navi' }],
    ['meta', { name: 'keywords', content: '阿里巴巴字节跳动腾讯' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    lastUpdated: 'Last Updated',
    logo: '/assets/img/hero.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '关于前端', link: '/introduction/' },
      { text: 'Guide', link: '/about/' },
      {
        text: 'Languages',
        items: [{
            text: 'Group1',
            items: [
              { text: 'Home', link: '/' },
              { text: 'Guide', link: '/about/' }
            ]
          },
          {
            text: 'Group2',
            items: [
              { text: 'Home', link: '/' },
              { text: 'Guide', link: '/about/' }
            ]
          }
        ]
      },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: 'auto'
  }
}