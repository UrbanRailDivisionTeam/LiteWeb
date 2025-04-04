import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home_view.vue'),
        },
        {
            path: '/staff_improvement_analysis/target_completion',
            name: '全员型改善指标分析',
            component: () => import('../views/staff_improvement_analysis/target_completion.vue'),
        },
        {
            path: '/staff_improvement_analysis/audit_completion',
            name: '全员型改善审核分析',
            component: () => import('../views/staff_improvement_analysis/audit_completion.vue'),
        },
        {
            path: '/comprehensive_management/personnel_effectiveness',
            name: '人员效能',
            component: () => import('../views/comprehensive_management/personnel_effectiveness.vue'),
        },
        {
            path: '/comprehensive_management/business_trip/business_trip_map',
            name: '制造差旅地图',
            component: () => import('../views/comprehensive_management/business_trip/business_trip_map.vue'),
        },
        {
            path: '/comprehensive_management/business_trip/business_trip_page',
            name: '制造差旅指标与详情看板',
            component: () => import('../views/comprehensive_management/business_trip/business_trip_page.vue'),
        },
        {
            path: '/production_command_center/planning_schedule',
            name: '计划排程',
            component: () => import('../views/production_command_center/planning_schedule.vue'),
        },
        {
            path: '/production_command_center/security_of_interested_parties',
            name: '相关方安全',
            component: () => import('../views/production_command_center/security_of_interested_parties.vue'),
        },
        {
            path: '/trade_federation/design_change_cost',
            name: '设计变更成本',
            component: () => import('../views/trade_federation/design_change_cost.vue'),
        },
        {
            path: '/trade_federation/design_change_conversion',
            name: '设计变更流转统计',
            component: () => import('../views/trade_federation/design_change_conversion.vue'),
        },
        {
            path: '/metro_address_directory',
            name: '城轨通讯录',
            component: () => import('../views/metro_address_directory.vue'),
        },
    ],
})

export default router
