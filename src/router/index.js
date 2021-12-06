import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Project from '../views/Project.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/Project',
    name: 'Project',
    component: Project
  },
  {
    path: '/ProjectDetail',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
