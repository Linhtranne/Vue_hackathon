import { createRouter, createWebHistory } from 'vue-router';

// Import components for each route
import Dashboard from '../components/Dashboard.vue';
import ManagerProduct from '../components/managerProduct.vue';
import ManagerCategory from '../components/managerCategory.vue';

// Define routes
const routes = [
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/manager-product',
    name: 'ManagerProduct',
    component: ManagerProduct
  },
  {
    path: '/admin/manager-category',
    name: 'ManagerCategory',
    component: ManagerCategory
  },
  {
    path: '/:catchAll(.*)',  // Catch all route for undefined paths
    redirect: '/admin'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
