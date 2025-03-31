import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView,
  },
  {
    path: '/reminder',
    name: 'Reminder',
    component: ReminderView,
  },
  {
    path: '/uvindex',
    name: 'UVIndex',
    component: UVIndexView,
  },
  {
    path: '/test',
    name: 'Test',
    component: TEST_main,
  },
  {
    path: '/new',
    name: 'New',
    component: New,
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// **Global Navigation Guard: Restrict access to the entire website**
router.beforeEach((to, from, next) => {
  const correctPassword = '123456' // Set your desired password
  const enteredPassword = localStorage.getItem('site_password')

  if (to.path === '/password') {
    next() // Allow access to the password input page
  } else if (enteredPassword === correctPassword) {
    next() // If the password is correct, proceed to the requested page
  } else {
    next('/password') // Otherwise, redirect to the password page
  }
})

export default router
