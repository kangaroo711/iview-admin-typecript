import Main from "@/components/main";

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login - 登录",
      hideInMenu: true
    },
    component: () => import("@/view/login/login.vue")
  },
  {
    path: "/",
    name: "_home",
    redirect: "info-manage/invoice-order-list",
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: true,
          title: "首页",
          notCache: true,
          icon: "md-home"
        },
        component: () => import("@/view/home/home.vue")
      }
    ]
  },
  {
    path: "/info-manage",
    name: "info-manage",
    meta: {
      icon: "logo-buffer",
      title: "信息管理"
    },
    component: Main,
    children: [
      {
        path: "invoice-order-list",
        name: "invoice-order-list",
        meta: {
          title: "开票订单列表"
        },
        component: () =>
          import(
            "@/view/info-manage/invoice-order-list/invoice-order-list.vue"
          ),
        // children: [
        //   {
        //     path: "detail",
        //     name: "detail",
        //     meta: {
        //       title: "开票详情"
        //     },
        //     component: () =>
        //       import(
        //         "@/view/info-manage/invoice-order-list/invoice-order-list.vue"
        //       )
        //   }
        // ]
      },
      {
        path: "invoice-destroy-manage",
        name: "invoice-destroy-manage",
        meta: { title: "销方信息管理" },
        component: () =>
          import(
            "@/view/info-manage/invoice-destroy-manage/invoice-destroy-manage.vue"
          )
      }
      // {path: 'invoice-info-manage', name: 'invoice-info-manage', meta:{title: '发票信息管理'},component: () => import('@/view/info-manage/invoice-info-manage/invoice-info-manage.vue')},
      // {path: 'invoice-type-manage', name: 'invoice-type-manage', meta:{title: '发票分类管理'},component: () => import('@/view/info-manage/invoice-type-manage/invoice-type-manage.vue')},
      // {path: 'invoice-title-manage', name: 'invoice-title-manage', meta:{title: '开票抬头管理'},component: () => import('@/view/info-manage/invoice-title-manage/invoice-title-manage.vue')}
    ]
  },
  {
    path: "/operate-serve-manage",
    name: "operate-serve-manage",
    meta: {
      icon: "ios-hammer",
      title: "运营服务器管理"
    },
    component: Main,
    children: [
      {
        path: "invoice-system-board",
        name: "invoice-system-board",
        meta: {
          title: "开票系统看板"
          // beforeCloseName: "before_close_normal"
        },
        component: () =>
          import(
            "@/view/operate-serve-manage/invoice-system-board/invoice-system-board.vue"
          )
      },
      {
        path: "tax-control-manage",
        name: "tax-control-manage",
        meta: { title: "税控盘管理" },
        component: () =>
          import(
            "@/view/operate-serve-manage/tax-control-manage/tax-control-manage.vue"
          )
      }
      // {path: 'data-statistic-report', name: 'data-statistic-report', meta:{title: '数据统计报表'},component: () => import('@/view/operate-serve-manage/data-statistic-report/data-statistic-report.vue')},
      // {path: 'hong-chong-manage', name: 'hong-chong-manage', meta:{title: '红冲管理'},component: () => import('@/view/operate-serve-manage/hong-chong-manage/hong-chong-manage.vue')},
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/404.vue")
  }
];
