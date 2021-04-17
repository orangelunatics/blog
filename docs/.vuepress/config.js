module.exports = {
  base: "/blog/",
  title: "Chase the Truth 🙏🏻",
  description: "navi的个人blog",
  head: [
    ['meta', { name: 'author', content: 'navi' }],
    ['meta', { name: 'keywords', content: '阿里巴巴字节跳动腾讯' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: ['go-top'],
  themeConfig: {
    lastUpdated: 'Last Updated',
    logo: '/assets/img/hero.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '简介', link: '/introduction/' },
      { text: '面经', link: '/interview/' },
      {
        text: '前端',
        items: [{
          text: '基础',
          items: [
            { text: 'HTML + CSS', link: '/interview/' },
            { text: 'JS + TS', link: '/JavaScript/' }
          ]
        }, {
          text: '框架',
          items: [
            { text: 'Vue', link: '/interview/' },
            { text: 'React', link: '/interview/' }
          ]
        }]
      },
      { text: '网络', link: '/interview/' },
      { text: '算法', link: '/interview/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: 'auto'
  }
}