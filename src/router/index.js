import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ReminderView from '@/views/ReminderView.vue'
import UVIndexView from '@/views/UVIndexView.vue'
import TEST_main from '@/views/TEST_main.vue'

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
    path:'/test',
    name:'Test',
    component: TEST_main
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
