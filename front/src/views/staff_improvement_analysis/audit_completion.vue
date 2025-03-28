<script setup>
import { ref, reactive } from 'vue'
import { NCard, NRadioGroup, NRadioButton, NVirtualList } from 'naive-ui'

const lastUpdateTime = ref('2024-08-29 06:08:00')
const selectedDepartment = ref('质量技术部')
const subDepartments = ref([
    { name: '质量组', rate: 100, completed: 10, target: 10 },
    { name: '技术组', rate: 95, completed: 19, target: 20 },
    { name: '检测组', rate: 88, completed: 22, target: 25 },
    { name: '标准组', rate: 100, completed: 15, target: 15 },
    { name: '计量组', rate: 92, completed: 23, target: 25 }
])

const departmentStats = reactive([
    {
        m_name: '质量技术部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: []
    },
    {
        m_name: '项目工程部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: []
    },
    {
        m_name: '综合管理部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: []
    },
    {
        m_name: '总成车间',
        rate: 100,
        completed: 0,
        target: 0,
        sub: []
    },
    {
        m_name: '交车车间',
        rate: 100,
        completed: 0,
        target: 0,
        sub: []
    }
])

// 格式化百分比
const formatPercent = (value) => {
    return `${value.toFixed(1)}%`
}
</script>

<template>
    <div class="target-completion">
        <div class="page-header">
            <h2>全员型改善提交审核完成情况</h2>
        </div>

        <div class="data-overview">
            <div class="update-time">数据仅显示当月完成情况，后台自动更新数据，最近更新：{{ lastUpdateTime }}</div>

            <div class="statistics-cards">
                <n-card class="stat-card" v-for="dept in departmentStats" :key="dept.m_name">
                    <div class="stat-title">
                        {{ dept.m_name }}审核完成率
                    </div>
                    <div class="stat-value" :class="{ 'completed': dept.rate >= 100 }">
                        {{ formatPercent(dept.rate) }}
                    </div>
                    <div class="stat-progress">
                        已审核提案数 {{ dept.completed }} / 已提交提案数 {{ dept.target }}
                    </div>
                </n-card>
            </div>
        </div>

        <n-card class="content-card">
            <div class="section-header">
                <h3>部门对应审核人完成情况</h3>
                <div class="header-right">
                    <n-radio-group v-model:value="selectedDepartment" type="button">
                        <n-radio-button v-for="dept in departmentStats" :key="dept.m_name" :value="dept.m_name">
                            {{ dept.m_name }}
                        </n-radio-button>
                    </n-radio-group>
                </div>
            </div>
            <n-virtual-list :items="subDepartments" :item-size="60" class="virtual-list">
                <template #default="{ item }">
                    <n-card class="sub-dept-card">
                        <div class="sub-dept-title">{{ item.name }}</div>
                        <div class="sub-dept-value" :class="{ 'completed': item.rate >= 100 }">
                            {{ formatPercent(item.rate) }}
                        </div>
                        <div class="sub-dept-progress">
                            已审核提案数 {{ item.completed }} / 已提交提案数 {{ item.target }}
                        </div>
                    </n-card>
                </template>
            </n-virtual-list>
        </n-card>
    </div>
</template>

<style scoped>
.target-completion {
    padding: 30px;
}

.page-header {
    margin-bottom: 20px;
}

.page-header h2 {
    margin: 0;
    color: #303133;
    font-size: 26px;
    font-weight: 500;
}

.data-overview {
    margin-top: 20px;
}

.update-time {
    color: #909399;
    font-size: 14px;
    margin: 8px 0 20px;
}

.statistics-cards {
    display: flex;
    gap: 20px;
}

.stat-card {
    flex: 1;
}

.stat-title {
    color: #606266;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
}

.stat-value {
    font-size: 36px;
    font-weight: 500;
    color: #303133;
}

.stat-value.completed {
    color: #67C23A;
}

.stat-progress {
    color: #606266;
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
}

.content-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h3 {
    margin: 0;
    color: #303133;
    font-size: 18px;
    font-weight: 500;
}

.header-right {
    display: flex;
    gap: 12px;
    align-items: center;
}

.virtual-list {
    flex: 1;
    overflow: auto;
}

.sub-dept-card {
    margin-bottom: 12px;
}

.sub-dept-title {
    color: #606266;
    font-size: 14px;
    font-weight: 500;
}

.sub-dept-value {
    font-size: 24px;
    font-weight: 500;
    margin: 8px 0;
    color: #303133;
}

.sub-dept-value.completed {
    color: #67C23A;
}

.sub-dept-progress {
    color: #606266;
    font-size: 12px;
    font-weight: 500;
}
</style>
