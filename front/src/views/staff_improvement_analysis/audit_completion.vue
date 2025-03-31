<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { NCard, NRadioGroup, NRadioButton } from 'naive-ui'
import * as echarts from 'echarts'

const lastUpdateTime = ref('2024-08-29 06:08:00')
const selectedDepartment = ref('质量技术部')
const subDepartments = ref([
    { name: '张三', rate: 100, completed: 10, target: 10 },
    { name: '李四', rate: 95, completed: 19, target: 20 },
    { name: '王五', rate: 88, completed: 22, target: 25 },
    { name: '赵六', rate: 100, completed: 15, target: 15 },
    { name: '钱七', rate: 92, completed: 23, target: 25 },
])

const departmentStats = reactive([
    {
        m_name: '质量技术部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [],
    },
    {
        m_name: '项目工程部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [],
    },
    {
        m_name: '综合管理部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [],
    },
    {
        m_name: '总成车间',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [],
    },
    {
        m_name: '交车车间',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [],
    },
])

const charts = ref([])
const chartObserver = ref(null)

// 初始化环形图
const initPieChart = (el, data) => {
    if (!el) return null

    const chart = echarts.init(el)
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: function (params) {
                return `${params[0].name}: ${params[0].value}个`
            },
        },
        grid: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            show: false,
            max: data.target,
        },
        yAxis: {
            type: 'category',
            data: ['审核进度'],
            show: false,
            inverse: true,
        },
        series: [
            {
                type: 'bar',
                data: [data.completed],
                barWidth: '30%',
                itemStyle: {
                    color: '#67C23A',
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: `${data.completed}/${data.target}`,
                },
            },
            {
                type: 'bar',
                data: [data.target - data.completed],
                barWidth: '30%',
                itemStyle: {
                    color: '#F56C6C',
                },
                stack: 'total',
            },
        ],
    }
    chart.setOption(option)
    return chart
}

// 更新所有图表
const updateCharts = async () => {
    // 先销毁现有图表
    charts.value.forEach((chart) => {
        if (chart) {
            chart.dispose()
        }
    })
    charts.value = []

    // 等待DOM更新
    await nextTick()

    // 获取所有图表容器并初始化
    const chartElements = document.querySelectorAll('.bar-chart')
    chartElements.forEach((el, index) => {
        if (el && subDepartments.value[index]) {
            const chart = initPieChart(el, subDepartments.value[index])
            if (chart) {
                charts.value.push(chart)
            }
        }
    })
}

// 格式化百分比
const formatPercent = (value) => {
    return `${value.toFixed(1)}%`
}

// 监听部门变化，更新图表
watch(selectedDepartment, () => {
    updateCharts()
})

// 监听窗口大小变化
const handleResize = () => {
    charts.value.forEach((chart) => {
        if (chart) {
            chart.resize()
        }
    })
}

onMounted(async () => {
    // 初始化 ResizeObserver
    chartObserver.value = new ResizeObserver(() => {
        handleResize()
    })

    // 监听所有图表容器的大小变化
    const chartElements = document.querySelectorAll('.bar-chart')
    chartElements.forEach((el) => {
        if (el) {
            chartObserver.value.observe(el)
        }
    })

    // 初始化图表
    await updateCharts()
})

onBeforeUnmount(() => {
    // 清理 ResizeObserver
    if (chartObserver.value) {
        chartObserver.value.disconnect()
        chartObserver.value = null
    }

    // 清理图表实例
    charts.value.forEach((chart) => {
        if (chart) {
            chart.dispose()
        }
    })
    charts.value = []
})
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
                    <div class="stat-title">{{ dept.m_name }}审核完成率</div>
                    <div class="stat-value" :class="{ completed: dept.rate >= 100 }">
                        {{ formatPercent(dept.rate) }}
                    </div>
                    <div class="stat-progress">已审核提案数 {{ dept.completed }} / 已提交提案数 {{ dept.target }}</div>
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
            <div class="list-container">
                <n-card v-for="item in subDepartments" :key="item.name" class="sub-dept-card">
                    <div class="sub-dept-content">
                        <div class="sub-dept-info">
                            <div class="sub-dept-title">{{ item.name }}</div>
                            <div class="sub-dept-progress">已审核提案数 {{ item.completed }} / 已提交提案数 {{ item.target }}</div>
                        </div>
                        <div class="bar-chart"></div>
                    </div>
                </n-card>
            </div>
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
    color: #67c23a;
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

.list-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.sub-dept-card {
    margin-bottom: 0;
}

.sub-dept-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
}

.sub-dept-info {
    flex: 1;
}

.sub-dept-title {
    color: #303133;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
}

.sub-dept-progress {
    color: #606266;
    font-size: 14px;
}

.bar-chart {
    width: 300px;
    height: 60px;
    margin-left: 20px;
    position: relative;
}
</style>
