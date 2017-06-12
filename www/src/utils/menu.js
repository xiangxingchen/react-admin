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
    key: 'comment',
    name: '评论管理',
    icon: 'message',
    clickable: false,
  },
    {
        key: 'tag',
        name: '标签管理',
        icon: 'tag',
        clickable: false,
        child: [
            {
                key: 'addtag',
                name: '添加标签'
            },
            {
                key: 'taglist',
                name: '标签列表'
            }
        ]
    },
    {
        key: 'category',
        name: '分类管理',
        icon: 'bars',
        clickable: false,
        child: [
            {
                key: 'addcategory',
                name: '添加分类'
            },
            {
                key: 'categorylist',
                name: '分类列表'
            }
        ]
    }
]
