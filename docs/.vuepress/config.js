module.exports = {
  base: "/blog/",
  title: "Go big ɔ: Go home 🍁",
  description: "navi的个人blog",
  head: [
    ['meta', { name: 'author', content: 'navi' }],
    ['meta', { name: 'keywords', content: 'navi' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script',{type: 'text/javascript', src: '//rf.revolvermaps.com/0/0/6.js?i=58kyuv0rzom&amp;m=7&amp;c=e63100&amp;cr1=ffffff&amp;f=arial&amp;l=0&amp;bv=90&amp;lx=-420&amp;ly=420&amp;hi=20&amp;he=7&amp;hc=a8ddff&amp;rs=80',async: 'async'}]
  ],
  plugins: ['go-top'],
  themeConfig: {
    lastUpdated: 'Last Updated',
    logo: '/assets/img/hero.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'intro', link: '/introduction/' },
      { text: '面经', link: '/interview/' },
      {
        text: '前端',
        items: [{
          text: '基础',
          items: [
            { text: 'HTML + CSS', link: '/H5/' },
            { text: 'JS + TS', link: '/JavaScript/' }
          ]
        }, {
          text: '框架',
          items: [
            { text: 'Vue', link: '/Vue/' },
            { text: 'React', link: '/React/' }
          ]
        }]
      },
      { text: 'Node.js', link: '/node/' },
      { text: '网络', link: '/network/' },
      { text: '算法', link: '/algorithm/' },
      { text: '数据库', link: '/database/' },
      { text: '其他', link: '/others/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: 'auto'
  }
}