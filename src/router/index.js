import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import test from "../views/test.vue";
import createPdf from "../views/createPdf.vue";
import backFunction from "../views/backFunction.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
  ,
  {
    path: "/createPdf",
    name: "createPdf",
   
    component: createPdf
  }
  ,
  {
    path: "/backFunction",
    name: "backFunction",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: backFunction
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
