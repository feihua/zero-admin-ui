export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: '二级管理页',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: '查询表格',
  //   icon: 'table',
  //   path: '/list',
  //   component: './ListTableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'crown',
    routes: [
      {
        name: '用户管理',
        icon: 'table',
        path: '/system/user/list',
        component: './system/user',
      },
      {
        name: '角色管理',
        icon: 'table',
        path: '/system/role/list',
        component: './system/role',
      },
      {
        name: '菜单管理',
        icon: 'table',
        path: '/system/menu/list',
        component: './system/menu',
      },
      {
        name: '机构管理',
        icon: 'table',
        path: '/system/dept/list',
        component: './system/dept',
      },
      {
        name: '字典管理',
        icon: 'table',
        path: '/system/dict/list',
        component: './system/dict',
      },
      // {
      //   name: '参数管理',
      //   icon: 'table',
      //   path: '/system/param/list',
      //   component: './system/param',
      // },
    ],
  },
  {
    path: '/log',
    name: '日志管理',
    icon: 'crown',
    routes: [
      {
        name: '登录日志',
        icon: 'table',
        path: '/log/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '操作日志',
        icon: 'table',
        path: '/log/sysLog/list',
        component: './log/sysLog',
      },
    ],
  },
  {
    component: './404',
  },
];
