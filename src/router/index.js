import {createRouter, createWebHistory} from 'vue-router';
import MainLayout from '../views/layouts/MainLayout.vue';
import AuthLayout from '../views/layouts/AuthLayout.vue';
import {loadPage} from '../services/functions.js';
import {useNotification} from "../composables/notification";
import {useAuthStore} from "../state/auth";
import {getTokenFromStorage} from "../storage/user";
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
            },
            alias: ['/home', '/main'],
        },
        {
            path: '/images/:id',
            name: 'image',
            component: load('ImageView'),
            props: true,
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
            },
            props: true,
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
        {
            path: '/:path(.*)',
            name: 'not found',
            component: load('NotFound'),
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? {
            top: savedPosition.top,
            left: 0,
            behavior: 'smooth',
        } : {top: 0};
    },
});


router.beforeEach((to, from, next ) => {
    const {showNotification} = useNotification();
    const isNotAuthed = !(!!getTokenFromStorage());
    if (isNotAuthed) {
        const forbiddenRoutes = ['profile', 'liked'];

        if (forbiddenRoutes.includes(to.name)) {
            showNotification({
                isError: true,
                message: 'No access to this page'
            });

            return next(from);
        }
    }

    next();
});

export default router
