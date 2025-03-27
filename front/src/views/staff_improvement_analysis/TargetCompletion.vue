<script setup>
import { ref, reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getDepartmentStats, getLastUpdateTime } from '@/api/staffImprovement'
import { useMessage } from 'naive-ui'

const message = useMessage()

const lastUpdateTime = ref('2024-08-29 06:08:00')
const selectedDepartment = ref('质量技术部')

const charts = reactive([
    {
        id: '质量技术部',
        dom_name: 'qualityTechChart',
        chart: null,
    },
    {
        id: '项目工程部',
        dom_name: 'projectEngChart',
        chart: null,
    },
    {
        id: '综合管理部',
        dom_name: 'managementChart',
        chart: null,
    },
    {
        id: '总成车间',
        dom_name: 'assemblyChart',
        chart: null,
    },
    {
        id: '交车车间',
        dom_name: 'deliveryChart',
        chart: null,
    },
])
const chartObserver = ref(null)
const departmentStats = reactive([
    {
        m_name: '质量技术部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [
            {
                m_name: '质量保证组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '交付质量组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '过程质量组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '粘接组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '内装组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '机械组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '电气组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '调试组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '总体技术组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '技术管理组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '精益信息化组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '检查班',
                rate: 100,
                completed: 0,
                target: 0,
            },
        ],
    },
    {
        m_name: '项目工程部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [
            {
                m_name: '交车进程组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '生产管理组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '现场安全组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '计划管理组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '设备管理组',
                rate: 100,
                completed: 0,
                target: 0,
            },
        ],
    },
    {
        m_name: '综合管理部',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [
            {
                m_name: '人力资源组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '经营计划组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '财务管理组',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '行政管理组',
                rate: 100,
                completed: 0,
                target: 0,
            },
        ],
    },
    {
        m_name: '总成车间',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [
            {
                m_name: '管钳一工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '电工一工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '内装一工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '管钳三工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '电工三工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '内装三工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '电工五工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '粘接二工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '粘接一工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '设备工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '电工四工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '内装四工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '车门工位',
                rate: 100,
                completed: 0,
                target: 0,
            },
        ],
    },
    {
        m_name: '交车车间',
        rate: 100,
        completed: 0,
        target: 0,
        sub: [
            {
                m_name: '落车班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '调车班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '校线一班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '校线二班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '调试一班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '调试二班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '调试三班',
                rate: 100,
                completed: 0,
                target: 0,
            },
            {
                m_name: '调试四班',
                rate: 100,
                completed: 0,
                target: 0,
            },
        ],
    },
])

// 格式化百分比
const formatPercent = (value) => {
    return `${value.toFixed(1)}%`
}

const fetchData = async () => {
    try {
        const [lastUpdateTimeData, departmentStatsData] = await Promise.all([getLastUpdateTime(), getDepartmentStats()])
        lastUpdateTime.value = lastUpdateTimeData.lastUpdateTime

        // 确保 departmentStatsData 是数组
        if (Array.isArray(departmentStatsData)) {
            // 清空现有数据
            departmentStats.length = 0
            // 添加新数据
            departmentStats.push(...departmentStatsData)
        } else {
            message.error('获取部门数据格式错误')
        }
    } catch (error) {
        console.error('获取数据失败:', error)
        message.error('获取数据失败')
    }
}

const initDeptChart = (deptKey) => {
    const chartDom = document.getElementById(deptKey)
    const myChart = echarts.init(chartDom)

    const currentDept = departmentStats.find((dept) => {
        const chartItem = charts.find((item) => item.dom_name === deptKey)
        return chartItem && chartItem.id === dept.m_name
    })

    if (!currentDept) return myChart

    const subDepts = currentDept.sub.map((item) => item.m_name)
    const completionRates = currentDept.sub.map((item) => item.rate)
    const targetDiff = currentDept.sub.map((item) => item.target - item.completed)

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: function (params) {
                if (params[0].seriesName === '完成率') {
                    return `${params[0].name}<br/>${params[0].seriesName}：${params[0].value}%`
                } else {
                    return `${params[0].name}<br/>${params[0].seriesName}：${params[0].value}个`
                }
            },
        },
        legend: {
            data: ['完成率', '距离目标差值'],
            top: 10,
        },
        grid: [
            {
                left: '3%',
                right: '52%',
                bottom: '3%',
                containLabel: true,
            },
            {
                left: '52%',
                right: '3%',
                bottom: '3%',
                containLabel: true,
            },
        ],
        xAxis: [
            {
                type: 'category',
                gridIndex: 0,
                data: subDepts,
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                },
            },
            {
                type: 'category',
                gridIndex: 1,
                data: subDepts,
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                gridIndex: 0,
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value}%',
                },
                name: '完成率',
                nameLocation: 'middle',
                nameGap: 40,
            },
            {
                type: 'value',
                gridIndex: 1,
                min: -20,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value}',
                },
                name: '提案数量差值',
                nameLocation: 'middle',
                nameGap: 40,
            },
        ],
        series: [
            {
                name: '完成率',
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: completionRates,
                itemStyle: {
                    color: '#409EFF',
                },
                barWidth: '30%',
            },
            {
                name: '距离目标差值',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: targetDiff,
                itemStyle: {
                    color: function (params) {
                        if (params.value > 0) {
                            return '#F56C6C'
                        } else if (params.value < 0) {
                            return '#67C23A'
                        } else {
                            return '#909399'
                        }
                    },
                },
                barWidth: '30%',
            },
        ],
    }

    myChart.setOption(option)
    return myChart
}

const initResizeObserver = () => {
    chartObserver.value = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const chartItem = charts.find((item) => item.dom_name === entry.target.id)
            if (chartItem && chartItem.chart) {
                chartItem.chart.resize()
            }
        }
    })

    charts.forEach((chartItem) => {
        const chartDom = document.getElementById(chartItem.dom_name)
        if (chartDom) {
            chartObserver.value.observe(chartDom)
        }
    })
}

watch(selectedDepartment, (newDept) => {
    nextTick(() => {
        charts.forEach((chartItem) => {
            if (chartItem.id !== newDept && chartItem.chart) {
                chartItem.chart.dispose()
                chartItem.chart = null
            } else {
                if (!chartItem.chart) {
                    const chartDom = document.getElementById(chartItem.dom_name)
                    if (chartDom) {
                        chartItem.chart = initDeptChart(chartItem.dom_name)
                    }
                } else {
                    chartItem.chart.resize()
                }
            }
        })
    })
})

onMounted(async () => {
    await fetchData()
    nextTick(() => {
        initResizeObserver()
        const currentChart = charts.find((item) => item.id === selectedDepartment.value)
        if (currentChart) {
            const chartDom = document.getElementById(currentChart.dom_name)
            if (chartDom) {
                currentChart.chart = initDeptChart(currentChart.dom_name)
            }
        }
    })
})

onBeforeUnmount(() => {
    if (chartObserver.value) {
        chartObserver.value.disconnect()
        chartObserver.value = null
    }
    charts.forEach((chartItem) => {
        if (chartItem.chart) {
            chartItem.chart.dispose()
            chartItem.chart = null
        }
    })
})
</script>

<template>
    <div class="target-completion">
        <div class="page-header">
            <h2>全员型改善提交指标完成情况</h2>
        </div>

        <div class="data-overview">
            <div class="update-time">数据仅显示当月完成情况，后台自动更新数据，最近更新：{{ lastUpdateTime }}</div>

            <div class="statistics-cards">
                <n-card class="stat-card" v-for="dept in departmentStats" :key="dept.m_name">
                    <div class="stat-title">{{ dept.m_name }}改善指标</div>
                    <div class="stat-value" :class="{ completed: dept.rate >= 100 }">
                        {{ formatPercent(dept.rate) }}
                    </div>
                    <div class="stat-progress">已完成改善数 {{ dept.completed }} / 部门指标 {{ dept.target }}</div>
                </n-card>
            </div>
        </div>

        <n-card>
            <div class="section-header">
                <h3>部门对应组室完成情况</h3>
                <div class="header-right">
                    <n-radio-group v-model:value="selectedDepartment" type="button">
                        <n-radio-button v-for="dept in departmentStats" :key="dept.m_name" :value="dept.m_name">
                            {{ dept.m_name }}
                        </n-radio-button>
                    </n-radio-group>
                </div>
            </div>
            <div class="charts-container">
                <div id="qualityTechChart" class="chart-item" v-show="selectedDepartment === '质量技术部'"></div>
                <div id="projectEngChart" class="chart-item" v-show="selectedDepartment === '项目工程部'"></div>
                <div id="managementChart" class="chart-item" v-show="selectedDepartment === '综合管理部'"></div>
                <div id="assemblyChart" class="chart-item" v-show="selectedDepartment === '总成车间'"></div>
                <div id="deliveryChart" class="chart-item" v-show="selectedDepartment === '交车车间'"></div>
            </div>
        </n-card>
    </div>
</template>

<style scoped>
.target-completion {
    padding: 10px 10px 15px 15px;
    height: 100%;
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
    margin-bottom: 30px;
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
    margin: 16px 0;
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

.charts-container {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.chart-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    visibility: visible !important;
}
</style>
