import { createRouter, createWebHistory } from 'vue-router'
import { authGaurd } from '../middlewares/auth.middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/user',
      name:'user',
      component: () => import('../views/UserView.vue') 
    },
    {
      path:'/form',
      name:'form',
      component: () => import('../views/FormView.vue')
    },
    {
      path:'/form2',
      name:'form2',
      component: () => import('../views/Form2View.vue')
    },
    {
      path:'/listUsers',
      name:'listUsers',
      component: () => import('../views/ListUsersView.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/Login.vue')
    },
    {
      path:'/signup',
      name:'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path:'/form2/:id',
      name:'editUser',
      component: () => import('../views/Form2View.vue'),
      props: true
    },
    {
      path:'/shoppingcart',
      name: 'shoppingCart',
      component: () => import('../views/ShoppingCart.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true}
    }, 
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersList.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/Posts.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/updateEmail',
      name: 'updateEmail',
      component: () => import('../views/UpdateEmail.vue'),
      meta: {requiresAuth: true}
    }
    
  ],
})

router.beforeEach(authGaurd)

export default router
