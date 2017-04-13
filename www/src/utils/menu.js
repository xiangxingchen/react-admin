module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop',
    clickable:false
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user',
    clickable: false,
    child: [
      {
        key: 'adduser',
        name: '添加用户'
      },
      {
        key: 'userlist',
        name: '用户列表'
      }
    ]
  },
  {
    key: 'ui',
    name: 'UI组件',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'ico',
        name: 'Ico 图标'
      },
      {
        key: 'search',
        name: 'Search 搜索'
      }
    ]
  },
  {
    key: 'picture',
    name: '相册管理',
    icon: 'picture',
    clickable: false,
    child: [
      {
        key: 'addpic',
        name: '上传相册'
      },
      {
        key: 'piclist',
        name: '相册列表'
      }
    ]
  },
  {
    key: 'article',
    name: '文章管理',
    icon: 'picture',
    clickable: false,
    child: [
      {
        key: 'add',
        name: '添加文章'
      },
      {
        key: 'list',
        name: '文章列表'
      }
    ]
  },
  {
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1'
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1'
          },
          {
            key: 'navigation22',
            name: '三级导航2'
          }
        ]
      }
    ]
  }
]
