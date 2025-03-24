<script setup>
import { ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const lastUpdateTime = ref('2024-08-29 06:08:00')
const selectedDepartment = ref('qualityTech')

// 监听侧边栏状态变化
watch(layoutStore.isCollapse, (newVlaue) => {
    nextTick(() => {
        const chart = charts.value[selectedDepartment.value]
        console.log(chart)
        if (chart) {
            chart.resize()
        }
    })
})

// 监听选中部门变化
watch(selectedDepartment, (newDept) => {
    nextTick(() => {
        const chart = charts.value[newDept]
        if (chart) {
            chart.resize()
        }
    })
})

// 部门改善指标数据
const departmentStats = {
    qualityTech: {
        rate: 85.6,
        trend: 5.3,
        completed: 30,
        target: 60,
        subDepts: ['质量控制室', '技术研发室', '实验室', '标准化室', '计量室'],
    },
    projectEng: {
        rate: 78.2,
        trend: 8.7,
        completed: 25,
        target: 55,
        subDepts: ['工程一室', '工程二室', '工程三室', '工程四室', '工程五室'],
    },
    management: {
        rate: 92.5,
        trend: 3.2,
        completed: 35,
        target: 50,
        subDepts: ['人力资源室', '财务室', '行政室', '企划室', '安环室'],
    },
    assembly: {
        rate: 88.9,
        trend: 6.5,
        completed: 40,
        target: 65,
        subDepts: ['总装一区', '总装二区', '总装三区', '总装四区', '总装五区'],
    },
    delivery: {
        rate: 83.4,
        trend: 4.8,
        completed: 28,
        target: 58,
        subDepts: ['交付一区', '交付二区', '交付三区', '交付四区', '交付五区'],
    },
}

// 格式化百分比
const formatPercent = (value) => {
    return `${value.toFixed(1)}%`
}

// 图表实例对象
const charts = ref({
    qualityTech: null,
    projectEng: null,
    management: null,
    assembly: null,
    delivery: null,
})

// 初始化部门图表
const initDeptChart = (deptKey) => {
    const chartDom = document.getElementById(`${deptKey}Chart`)
    if (!chartDom) return

    const myChart = echarts.init(chartDom)
    charts.value[deptKey] = myChart

    // 模拟各组室的完成率数据
    const completionRates = [85, 76, 92, 68, 88]
    const targetRates = [90, 90, 90, 90, 90]

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            data: ['完成率', '目标值', '部门整体完成率'],
            right: 10,
            top: 10,
        },
        grid: {
            left: '3%',
            right: '25%', // 减小右侧空间，让柱状图占据更多空间
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: departmentStats[deptKey].subDepts,
            axisLabel: {
                interval: 0,
                rotate: 30,
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value}%',
            },
        },
        series: [
            {
                name: '完成率',
                type: 'bar',
                data: completionRates,
                itemStyle: {
                    color: '#409EFF',
                },
                barWidth: '30%',
            },
            {
                name: '目标值',
                type: 'line',
                data: targetRates,
                itemStyle: {
                    color: '#F56C6C',
                },
                lineStyle: {
                    type: 'dashed',
                },
                symbol: 'none',
            },
            {
                name: '部门整体完成率',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['88%', '50%'], // 调整环形图位置
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    {
                        value: departmentStats[deptKey].rate,
                        name: '已完成',
                        itemStyle: { color: '#409EFF' },
                    },
                    {
                        value: 100 - departmentStats[deptKey].rate,
                        name: '未完成',
                        itemStyle: { color: '#E4E7ED' },
                    },
                ],
            },
        ],
    }

    myChart.setOption(option)
}

// 监听窗口大小变化
const handleResize = () => {
    Object.values(charts.value).forEach((chart) => {
        chart && chart.resize()
    })
}

onMounted(() => {
    // 初始化所有部门的图表
    Object.keys(departmentStats).forEach((deptKey) => {
        initDeptChart(deptKey)
    })

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
})
</script>

<template>
    <div class="operation-analysis">
        <div class="page-header">
            <h2>全员型改善提交指标完成情况</h2>
        </div>

        <div class="data-overview">
            <div class="update-time">
                数据仅显示当月完成情况，后台自动更新数据，最近更新：{{ lastUpdateTime }}
            </div>

            <div class="statistics-cards">
                <el-card class="stat-card">
                    <div class="stat-title">
                        质量技术部改善指标
                        <el-tooltip content="质量技术部的改善完成情况统计" placement="top">
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="stat-value">
                        {{ formatPercent(departmentStats.qualityTech.rate) }}
                    </div>
                    <div class="stat-progress">
                        已完成改善数 {{ departmentStats.qualityTech.completed }} / 部门指标
                        {{ departmentStats.qualityTech.target }}
                    </div>
                </el-card>

                <el-card class="stat-card">
                    <div class="stat-title">
                        项目工程部改善指标
                        <el-tooltip content="项目工程部的改善完成情况统计" placement="top">
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="stat-value">
                        {{ formatPercent(departmentStats.projectEng.rate) }}
                    </div>
                    <div class="stat-progress">
                        已完成改善数 {{ departmentStats.projectEng.completed }} / 部门指标
                        {{ departmentStats.projectEng.target }}
                    </div>
                </el-card>

                <el-card class="stat-card">
                    <div class="stat-title">
                        综合管理部改善指标
                        <el-tooltip content="综合管理部的改善完成情况统计" placement="top">
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="stat-value">
                        {{ formatPercent(departmentStats.management.rate) }}
                    </div>
                    <div class="stat-progress">
                        已完成改善数 {{ departmentStats.management.completed }} / 部门指标
                        {{ departmentStats.management.target }}
                    </div>
                </el-card>

                <el-card class="stat-card">
                    <div class="stat-title">
                        总成车间改善指标
                        <el-tooltip content="总成车间的改善完成情况统计" placement="top">
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="stat-value">{{ formatPercent(departmentStats.assembly.rate) }}</div>
                    <div class="stat-progress">
                        已完成改善数 {{ departmentStats.assembly.completed }} / 部门指标
                        {{ departmentStats.assembly.target }}
                    </div>
                </el-card>

                <el-card class="stat-card">
                    <div class="stat-title">
                        交车车间改善指标
                        <el-tooltip content="交车车间的改善完成情况统计" placement="top">
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="stat-value">{{ formatPercent(departmentStats.delivery.rate) }}</div>
                    <div class="stat-progress">
                        已完成改善数 {{ departmentStats.delivery.completed }} / 部门指标
                        {{ departmentStats.delivery.target }}
                    </div>
                </el-card>
            </div>
        </div>

        <div class="trend-analysis">
            <div class="section-header">
                <h3>部门对应组室完成情况</h3>
                <div class="header-right">
                    <el-radio-group v-model="selectedDepartment" size="small">
                        <el-radio-button label="qualityTech">质量技术部</el-radio-button>
                        <el-radio-button label="projectEng">项目工程部</el-radio-button>
                        <el-radio-button label="management">综合管理部</el-radio-button>
                        <el-radio-button label="assembly">总成车间</el-radio-button>
                        <el-radio-button label="delivery">交车车间</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="charts-container">
                <div id="qualityTechChart" class="chart-item" v-show="selectedDepartment === 'qualityTech'"></div>
                <div id="projectEngChart" class="chart-item" v-show="selectedDepartment === 'projectEng'"></div>
                <div id="managementChart" class="chart-item" v-show="selectedDepartment === 'management'"></div>
                <div id="assemblyChart" class="chart-item" v-show="selectedDepartment === 'assembly'"></div>
                <div id="deliveryChart" class="chart-item" v-show="selectedDepartment === 'delivery'"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.operation-analysis {
    padding: 15px;
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

.trend-analysis {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    margin-top: 20px;
}

.header-right .el-radio-group {
    display: flex;
    gap: 0;
}

.header-right .el-radio-button {
    margin-right: -1px;
}

.header-right .el-radio-button:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.header-right .el-radio-button:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-right: 0;
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
