import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'

import LikedView from '../views/pages/LikedView.vue';
import ProfileView from '../views/pages/ProfileView.vue';
import ImageView from '../views/pages/ImageView.vue';
import TopView from '../views/pages/TopView.vue';
import UserView from '../views/pages/UserView.vue';
import RegisterView from '../views/pages/RegisterView.vue';
import LoginView from '../views/pages/LoginView.vue';
import DefaultLayout from "../views/layouts/DefaultLayout.vue";
import AuthLayout from '../views/layouts/AuthLayout.vue';
import MainLayout from '../views/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: MainLayout,
      }
    },
    {
      path: '/images/:id',
      name: 'image',
      component: ImageView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        layout: AuthLayout,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: AuthLayout,
      }
    },
    {
      path: '/liked',
      name: 'liked',
      component: LikedView,
      meta: {
        layout: MainLayout,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        layout: MainLayout,
      }
    },
    {
      path: '/users/:id',
      name: 'users',
      component: UserView,
      meta: {
        layout: MainLayout,
      }
    },
    {
      path: '/top',
      name: 'top',
      component: TopView,
      meta: {
        layout: MainLayout,
      }
    }
  ]
})

export default router
