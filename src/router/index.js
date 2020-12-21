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
  }
]

const router = new VueRouter({
  routes
})

export default router
