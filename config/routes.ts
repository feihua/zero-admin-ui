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
        name: '用户列表',
        icon: 'table',
        path: '/system/user/list',
        component: './system/user',
      },
      {
        name: '角色列表',
        icon: 'table',
        path: '/system/role/list',
        component: './system/role',
      },
      {
        name: '菜单列表',
        icon: 'table',
        path: '/system/menu/list',
        component: './system/menu',
      },
      {
        name: '机构列表',
        icon: 'table',
        path: '/system/dept/list',
        component: './system/dept',
      },
      {
        name: '字典列表',
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
    path: '/ums',
    name: '会员管理',
    icon: 'crown',
    routes: [
      {
        name: '会员列表',
        icon: 'table',
        path: '/ums/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '会员等级',
        icon: 'table',
        path: '/ums/sysLog/list',
        component: './log/sysLog',
      },
      {
        name: '会员地址',
        icon: 'table',
        path: '/ums/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '等录记录',
        icon: 'table',
        path: '/ums/sysLog/list',
        component: './log/sysLog',
      },
    ],
  },
  {
    path: '/pms',
    name: '商品管理',
    icon: 'crown',
    routes: [
      {
        name: '商品列表',
        icon: 'table',
        path: '/pms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '商品分类',
        icon: 'table',
        path: '/pms/sysLog/list',
        component: './log/sysLog',
      },
      {
        name: '商品类型',
        icon: 'table',
        path: '/pms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '品牌管理',
        icon: 'table',
        path: '/pms/sysLog/list',
        component: './log/sysLog',
      },
    ],
  },
  {
    path: '/oms',
    name: '订单管理',
    icon: 'crown',
    routes: [
      {
        name: '订单列表',
        icon: 'table',
        path: '/oms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '订单设置',
        icon: 'table',
        path: '/oms/sysLog/list',
        component: './log/sysLog',
      },
      {
        name: '退货申请',
        icon: 'table',
        path: '/oms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '退货原因',
        icon: 'table',
        path: '/oms/sysLog/list',
        component: './log/sysLog',
      },
    ],
  },
  {
    path: '/sms',
    name: '营销管理',
    icon: 'crown',
    routes: [
      {
        name: '秒杀活动',
        icon: 'table',
        path: '/sms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '品牌推荐',
        icon: 'table',
        path: '/sms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '新品推荐',
        icon: 'table',
        path: '/sms/sysLog/list',
        component: './log/sysLog',
      },
      {
        name: '人气推荐',
        icon: 'table',
        path: '/sms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '专题推荐',
        icon: 'table',
        path: '/sms/sysLog/list',
        component: './log/sysLog',
      },
      {
        name: '广告列表',
        icon: 'table',
        path: '/sms/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '优惠券',
        icon: 'table',
        path: '/sms/sysLog/list',
        component: './log/sysLog',
      },
    ],
  },
  {
    component: './404',
  },
];
