import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Confirmation from '../views/Confirmation.vue'
import Event from "../views/AddEvent.vue"
import Login from "../views/Login.vue"
import Profile from "../views/Profile.vue"
import UpdateConfirmation from "../views/UpdateConfirmation"
import Admine from "../views/Admine"
import AdmineL from "../views/AdmineLogin"

import BienEtreShop from "../views/BienEtreShopping"
import Excursion from "../views/Excursion"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/UpdateConfirmation',
    name: 'UpdateConfirmation',
    component: UpdateConfirmation
  },
  {
    path: '/addEvent/:userID',
    name: 'Event',
    component: Event
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile/:userID",
    name: "profile",
    component: Profile
  },
  {
    path: "/admine/:userID",
    name: "admine",
    component: Admine
  },
  {
    path: "/admineLogin/:userID",
    name: "admineL",
    component: AdmineL
  },
  {
    path: "/addBienEtreShop/:userID",
    name: "bienEtreShop",
    component: BienEtreShop
  },
  {
    path: "/addExcursuin/:userID",
    name: "excursion",
    component: Excursion
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
