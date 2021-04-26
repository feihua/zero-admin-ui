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
      {
        name: '职位列表',
        icon: 'table',
        path: '/system/job/list',
        component: './system/job',
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
        path: '/ums/member/list',
        component: './ums/member',
      },
      {
        name: '会员等级',
        icon: 'table',
        path: '/ums/memberLevel/list',
        component: './ums/member_level',
      },
      {
        name: '会员地址',
        icon: 'table',
        path: '/ums/memberAddress/list',
        component: './ums/member_address',
      },
      {
        name: '登录记录',
        icon: 'table',
        path: '/ums/memberLoginLog/list',
        component: './ums/member_login_log',
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
        path: '/pms/product/list',
        component: './pms/product',
      },
      {
        name: '商品分类',
        icon: 'table',
        path: '/pms/productCategory/list',
        component: './pms/product_category',
      },
      {
        name: '品牌管理',
        icon: 'table',
        path: '/pms/productBrand/list',
        component: './pms/product_brand',
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
        path: '/oms/order/list',
        component: './oms/order',
      },
      {
        name: '订单设置',
        icon: 'table',
        path: '/oms/orderSetting/list',
        component: './oms/order_setting',
      },
      {
        name: '退货申请',
        icon: 'table',
        path: '/oms/orderReturnApply/list',
        component: './oms/order_return_apply',
      },
      {
        name: '退货原因',
        icon: 'table',
        path: '/oms/orderReturnReason/list',
        component: './oms/order_return_reason',
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
        path: '/sms/flashPromotion/list',
        component: './sms/flash_promotion',
      },
      {
        name: '品牌推荐',
        icon: 'table',
        path: '/sms/homeBrand/list',
        component: './sms/home_brand',
      },
      {
        name: '新品推荐',
        icon: 'table',
        path: '/sms/homeNewProduct/list',
        component: './sms/home_new_product',
      },
      {
        name: '人气推荐',
        icon: 'table',
        path: '/sms/homeRecommendProduct/list',
        component: './sms/home_recommend_product',
      },
      {
        name: '专题推荐',
        icon: 'table',
        path: '/sms/homeRecommendSubject/list',
        component: './sms/home_recommend_subject',
      },
      {
        name: '广告列表',
        icon: 'table',
        path: '/sms/homeAdvertise/list',
        component: './sms/home_advertise',
      },
      {
        name: '优惠券',
        icon: 'table',
        path: '/sms/coupon/list',
        component: './sms/coupon',
      },
    ],
  },
  {
    component: './404',
  },
];
