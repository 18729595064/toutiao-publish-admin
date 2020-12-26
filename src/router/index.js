import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Login = () => {import("@/views/login")};
import Login from "@/views/login"
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',  //有默认子路由，父路由不设置name
    component: ()=>import("@/views/layout"),
    children: [
      {
        path: '', //当path为空，为默认自路由
        name: 'home',
        component: ()=>import("@/views/home")
      },
      {
        path: '/article',
        name: 'article',
        component: () => import("@/views/article")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//路由导航守卫
// to： 要去的路由信息  from：来自哪里的路由信息  next：放行方法
router.beforeEach(((to, from, next) => {
  if (to.path === "/login"){
    next()
  }else{
    const user = window.localStorage.getItem("user");
    if (user){
      next();
    }else {
      next("/login");
    }
  }
}));

export default router
