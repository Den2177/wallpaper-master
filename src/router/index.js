import {createRouter, createWebHistory} from 'vue-router';
import MainLayout from '../views/layouts/MainLayout.vue';
import AuthLayout from '../views/layouts/AuthLayout.vue';
import {loadPage} from '../services/functions.js';

const load = loadPage;
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: load('HomeView'),
            meta: {
                layout: MainLayout,
            }
        },
        {
            path: '/images/:id',
            name: 'image',
            component: load('ImageView'),
        },
        {
            path: '/liked',
            name: 'liked',
            component: load('LikedView'),
            meta: {
                layout: MainLayout,
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: load('ProfileView'),
            meta: {
                layout: MainLayout,
            }

        },
        {
            path: '/users/:id',
            name: 'users',
            component: load('UserView'),
            meta: {
                layout: MainLayout,
            }
        },
        {
            path: '/top',
            name: 'top',
            component: load('TopView'),
            meta: {
                layout: MainLayout,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: load('RegisterView'),
            meta: {
                layout: AuthLayout,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: load('LoginView'),
            meta: {
                layout: AuthLayout,
            }
        },
    ]
})

export default router
