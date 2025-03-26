<script setup>
import { RouterView } from 'vue-router'
import {
    BookOutline as BookIcon,
    HomeOutline as HomeIcon,
    ChevronForward as ChevronForwardIcon,
    ChevronBack as ChevronBackIcon
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
            <n-layout-sider bordered collapse-mode="width" :root-indent="12" :index="10" :collapsed-width="64" :width="210"
                show-trigger @collapse="handleCollapse" class="aside">
                <n-menu :value="route.path" :collapsed-width="64" :collapsed-icon-size="22"
                    :options="[
                        {
                            label: '城轨数据中台',
                            key: '/',
                            icon: renderIcon(HomeIcon)
                        },
                        {
                            label: '全员型改善分析',
                            key: '/staff_improvement_analysis',
                            icon: renderIcon(BookIcon),
                            children: [
                                {
                                    label: '指标完成情况',
                                    key: '/staff_improvement_analysis/target_completion',
                                    icon: renderIcon(BookIcon)
                                },
                                {
                                    label: '评审完成情况',
                                    key: '/staff_improvement_analysis/audit_completion',
                                    icon: renderIcon(BookIcon)
                                }
                            ]
                        }
                    ]" @update:value="handleMenuUpdate" />
            </n-layout-sider>

            <n-layout>
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
