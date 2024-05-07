import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from "../firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts",
      name: "posts",

      component: () => import("../views/PostsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",

      component: () => import("../views/Register.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",

      component: () => import("../components/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/conversations",
      name: "conversations",

      component: () => import("../views/ConversationView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      //path: "/profile/:currentUserUID",
      path: "/profile",
      name: "profile",

      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/conversations/:convo_ID",
      props: true,

      component: () => import("../views/ConversationView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/postEdit",
      name: "postEdit",

      component: () => import("../views/PostEditView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create-report",
      name: "CreateReport",

      component: () => import("../views/CreateReport.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" && auth.currentUser) {
    next("/posts");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/");
  }

  next();
});

export default router;
