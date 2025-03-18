import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ReminderView from '@/views/ReminderView.vue'
import UVIndexView from '@/views/UVIndexView.vue'
import TEST_main from '@/views/Map.vue'
import New from '@/views/New.vue'
import Statistics from '@/views/Statistics.vue'

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
  },
  {
    path:'/new',
    name: 'New',
    component: New
  },
  {
    path:'/statistics',
    name:'Statistics',
    component:Statistics
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
