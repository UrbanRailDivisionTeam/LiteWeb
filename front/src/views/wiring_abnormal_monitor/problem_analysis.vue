<template>
    <div class="problem-analysis">
        <div class="page-header">
            <h2>校线异常问题分析情况</h2>
        </div>

        <!-- 图表区域 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="24">
            <!-- 第一行图表 -->
            <n-grid-item :span="12">
                <n-card title="各项目异常平均数统计">
                    <div ref="projectAbnormalChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <n-grid-item :span="12">
                <n-card title="本月异常构型分类">
                    <div ref="abnormalTypeChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <!-- 第二行图表 -->
            <n-grid-item :span="12">
                <n-card title="本月异常原因分类">
                    <div ref="abnormalReasonChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <n-grid-item :span="12">
                <n-card title="本月异常责任单位分类">
                    <div ref="abnormalResponsibilityChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NCard, NGrid, NGridItem } from 'naive-ui'
import * as echarts from 'echarts'

// 图表引用
const projectAbnormalChartRef = ref(null)
const abnormalTypeChartRef = ref(null)
const abnormalReasonChartRef = ref(null)
const abnormalResponsibilityChartRef = ref(null)

// 图表实例
const charts = []

// 初始化各项目异常平均数统计图表
const initProjectAbnormalChart = () => {
    const chart = echarts.init(projectAbnormalChartRef.value)
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: ['上海十八号线增购第六列', '蒙特雷二增第十二列'],
            axisLabel: {
                interval: 0,
                rotate: 30,
            },
        },
        yAxis: {
            type: 'value',
            name: '异常数量',
        },
        series: [
            {
                name: '异常数量',
                type: 'bar',
                data: [15, 8],
                itemStyle: {
                    color: '#409EFF',
                },
            },
        ],
    }
    chart.setOption(option)
    charts.push(chart)
}

// 初始化本月异常构型分类图表
const initAbnormalTypeChart = () => {
    const chart = echarts.init(abnormalTypeChartRef.value)
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['终端', '线号', '标签', '电缆'],
        },
        series: [
            {
                name: '异常构型',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
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
                    { value: 35, name: '终端' },
                    { value: 25, name: '线号' },
                    { value: 20, name: '标签' },
                    { value: 15, name: '电缆' },
                ],
            },
        ],
    }
    chart.setOption(option)
    charts.push(chart)
}

// 初始化本月异常原因分类图表
const initAbnormalReasonChart = () => {
    const chart = echarts.init(abnormalReasonChartRef.value)
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['后续工序_意外破坏', '执行漏', '来料_接口失配', '工艺疏漏', '缺失'],
        },
        series: [
            {
                name: '异常原因',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
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
                    { value: 30, name: '后续工序_意外破坏' },
                    { value: 25, name: '执行漏' },
                    { value: 20, name: '来料_接口失配' },
                    { value: 15, name: '工艺疏漏' },
                    { value: 10, name: '缺失' },
                ],
            },
        ],
    }
    chart.setOption(option)
    charts.push(chart)
}

// 初始化本月异常责任单位分类图表
const initAbnormalResponsibilityChart = () => {
    const chart = echarts.init(abnormalResponsibilityChartRef.value)
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['制造班组', '设计', '电气工艺', '供应商', '机车事业部管线班', '调试工艺', '生产管理', '物流'],
        },
        series: [
            {
                name: '责任单位',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
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
                    { value: 25, name: '制造班组' },
                    { value: 15, name: '设计' },
                    { value: 10, name: '电气工艺' },
                    { value: 20, name: '供应商' },
                    { value: 5, name: '机车事业部管线班' },
                    { value: 10, name: '调试工艺' },
                    { value: 8, name: '生产管理' },
                    { value: 7, name: '物流' },
                ],
            },
        ],
    }
    chart.setOption(option)
    charts.push(chart)
}

// 更新图表
const updateCharts = () => {
    charts.forEach((chart) => chart.resize())
}

// 监听窗口大小变化
const handleResize = () => {
    updateCharts()
}

onMounted(() => {
    initProjectAbnormalChart()
    initAbnormalTypeChart()
    initAbnormalReasonChart()
    initAbnormalResponsibilityChart()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    charts.forEach((chart) => chart.dispose())
})
</script>

<style scoped>
.problem-analysis {
    padding: 20px;
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
</style>
