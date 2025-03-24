import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/staff_improvement_analysis/target_completion',
            name: '全员型改善指标分析',
            component: () => import('../views/staff_improvement_analysis/TargetCompletion.vue'),
        },
        {
            path: '/staff_improvement_analysis/audit_completion',
            name: '全员型改善审核分析',
            component: () => import('../views/staff_improvement_analysis/AuditCompletion.vue'),
        },
    ],
})

export default router
