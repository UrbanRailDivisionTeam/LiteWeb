<template>
  <n-menu
    v-model:value="activeKey"
    :options="menuOptions"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    @update:value="handleMenuUpdate"
  />
</template>

<script setup>
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { PeopleOutline, AnalyticsOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const router = useRouter()
const activeKey = ref(null)

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '全员型改善指标分析',
    key: '/staff_improvement_analysis',
    icon: renderIcon(AnalyticsOutline),
    children: [
      {
        label: '指标完成情况',
        key: '/staff_improvement_analysis/target_completion'
      },
      {
        label: '审核完成情况',
        key: '/staff_improvement_analysis/audit_completion'
      }
    ]
  },
  {
    label: '相关方管理',
    key: '/related_party_management',
    icon: renderIcon(PeopleOutline)
  }
]

// 处理菜单点击
const handleMenuUpdate = (key) => {
  router.push(key)
}

// 监听路由变化，更新激活的菜单项
router.afterEach((to) => {
  activeKey.value = to.path
})
</script>

<style scoped>
.n-menu {
  height: 100%;
}
</style> 