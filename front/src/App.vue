<script setup>
import { RouterView } from 'vue-router'
import {
    BookOutline as BookIcon,
    CropOutline as CropIcon,
    HomeOutline as HomeIcon,
    ConstructOutline as ConstructIcon,
    SettingsOutline as SettingsIcon,
    TrainOutline as TrainIcon,
    ChatbubbleOutline as ChatIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { ref, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isCollapse = ref(false)
const handleCollapse = () => {
    isCollapse.value = !isCollapse.value
}

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

function handleMenuUpdate(key) {
    router.push(key)
}
</script>

<template>
    <n-message-provider>
        <n-layout has-sider class="layout-container">
            <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="210" show-trigger @collapse="handleCollapse" class="aside">
                <n-menu :value="route.path" :collapsed-width="64" :collapsed-icon-size="22" :indent="16" :options="[
                    {
                        label: '城轨数据中台',
                        key: '/',
                        icon: renderIcon(HomeIcon)
                    },
                    {
                        label: '全员型改善',
                        key: '/staff_improvement_analysis',
                        icon: renderIcon(CropIcon),
                        children: [
                            {
                                label: '指标完成情况',
                                key: '/staff_improvement_analysis/target_completion',
                            },
                            {
                                label: '评审完成情况',
                                key: '/staff_improvement_analysis/audit_completion',
                            }
                        ]
                    },
                    {
                        label: '综合管理',
                        key: '/comprehensive_management',
                        icon: renderIcon(ConstructIcon),
                        children: [
                            {
                                label: '人员效能',
                                key: '/comprehensive_management/personnel_effectiveness',
                            },
                            {
                                label: '制造差旅',
                                key: '/comprehensive_management/business_trip',
                            }
                        ]
                    },
                    {
                        label: '生产指挥中心',
                        key: '/production_command_center',
                        icon: renderIcon(TrainIcon),
                        children: [
                            {
                                label: '计划排程',
                                key: '/production_command_center/planning_schedule',
                            },
                            {
                                label: '相关方安全',
                                key: '/production_command_center/security_of_interested_parties',
                            }
                        ]
                    },
                    {
                        label: '业联系统',
                        key: '/trade_federation',
                        icon: renderIcon(ChatIcon),
                        children: [
                            {
                                label: '设计变更成本',
                                key: '/trade_federation/design_change_cost',
                            },
                            {
                                label: '设计变更流转统计',
                                key: '/trade_federation/design_change_conversion',
                            }
                        ]
                    },
                    {
                        label: '城轨通讯录',
                        key: '/metro_phone_directory',
                        icon: renderIcon(BookIcon),
                    }
                ]" @update:value="handleMenuUpdate" />
            </n-layout-sider>

            <n-layout class="content">
                <n-layout-content class="content">
                    <RouterView />
                </n-layout-content>
            </n-layout>
        </n-layout>
    </n-message-provider>
</template>

<style scoped>
.layout-container {
    height: 100vh;
}

.collapse-btn {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    background-color: #f0f2f5;
}
</style>
