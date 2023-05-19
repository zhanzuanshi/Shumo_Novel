import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  //   主页面
  {
    path: "/",
    name: "home",
    redirect: "/frontpage",
    component: () => import("@/views/home"),
    children: [
      {
        path: "/frontpage",
        name: "frontpage",
        component: () => import("@/views/frontPage"),
      },
      // 书架
      {
        path: "/chelf",
        name: "chelf",
        component: () => import("@/views/chelf"),
      },
      // 分类
      { path: "/type", name: "type", component: () => import("@/views/type") },
      // 排行
      { path: "/rank", name: "rank", component: () => import("@/views/rank") },
    ],
  },
  // 书籍详情
  {
    path: "/bookinfo",
    name: "bookinfo",
    component: () => import("@/views/bookInfo"),
  },
  // 章节内容
  { path: "/read", name: "read", component: () => import("@/views/read") },
  //分类详情
  {
    path: "/typedetai",
    name: "typedetail",
    component: () => import("@/views/typedetail"),
  },
  // 登录
  { path: "/login", name: "login", component: () => import("../views/login") },
  // 章节列表
  {
    path: "/content",
    name: "content",
    component: () => import("@/views/contentList"),
  },
  // 搜索
  {
    path: "/search",
    name: "search",
    redirect: "/searcharea",
    component: () => import("../views/search"),
    children: [
      {
        path: "/searcharea",
        name: "searcharea",
        component: () => import("../components/search/searcharea"),
      },
      {
        path: "/result",
        name: "result",
        component: () => import("../components/search/result"),
      },
    ],
  },
  // 个人中心
  {
    path: "/center",
    name: "center",
    component: () => import("../views/center"),
  },
  // 后台
  {
    path: "/admin",
    name: "admin",
    redirect:'/echarts',
    component: () => import("../views/admin"),
    children: [
      {
        path: "/users",
        name: "users",
        component: () => import("../views/users"),
      },
      {
        path: "/adduser",
        name: "adduser",
        component: () => import("../views/addUser"),
      },
      {
        path: "/echarts",
        name: "echarts",
        component: () => import("../views/echarts"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.push({ path: "/login" }).catch((err) => {
  console.log(err);
});
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("userInfo")
  if (!token && to.path !== "/login" && to.path !== "/frontpage") {
    next("/login");
  }
  next()
});
export default router;
