<template>
    <div class="process-control">
        <div class="page-header">
            <h2>异常处理进程管控情况</h2>
        </div>

        <!-- 统计卡片区域 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="4" class="mb-4">
            <n-grid-item v-for="(card, index) in statisticsCards" :key="index">
                <n-card>
                    <template #header>
                        {{ card.title }}
                    </template>
                    <div class="card-value">{{ card.value }}</div>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- 异常处理及时率柱状图区域 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="24" class="mb-4">
            <n-grid-item :span="12">
                <n-card title="各班组及时响应率">
                    <div ref="responseRateChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <n-grid-item :span="12">
                <n-card title="各班组及时诊断率">
                    <div ref="diagnosisRateChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- 异常处理及时明细表区域 -->
        <n-card class="detail-table-card">
            <template #header>
                <n-space vertical>
                    <n-radio-group v-model:value="selectedStatus" @update:value="handleStatusChange">
                        <n-radio-button value="response">未及时响应明细</n-radio-button>
                        <n-radio-button value="diagnosis_start">未及时发起诊断明细</n-radio-button>
                        <n-radio-button value="diagnosis">未及时诊断明细</n-radio-button>
                        <n-radio-button value="rework">未及时返工明细</n-radio-button>
                        <n-radio-button value="acceptance">未及时验收明细</n-radio-button>
                    </n-radio-group>
                </n-space>
            </template>
            <n-data-table :columns="columns" :data="tableData" :pagination="pagination" :bordered="true" :single-line="false" @update:page="handlePageChange" />
        </n-card>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NCard, NGrid, NGridItem, NRadioGroup, NRadioButton, NDataTable, NSpace } from 'naive-ui'
import * as echarts from 'echarts'

// 统计卡片数据
const statisticsCards = ref([
    { title: '今日异常数量', value: 7 },
    { title: '本月异常数量', value: 47 },
    { title: '待处理异常', value: 6 },
    { title: '已处理异常', value: 144 },
])

// 选中的状态
const selectedStatus = ref('response')

// 表格列定义
const columns = [
    { title: '项目号', key: 'projectNo' },
    { title: '跟踪号', key: 'trackingNo' },
    { title: '节车号', key: 'carNo' },
    { title: '构型名称', key: 'configName' },
    { title: '现象分类', key: 'phenomenonType' },
    { title: '发起时间', key: 'startTime' },
    { title: '发起人', key: 'initiator' },
    { title: '整改类别', key: 'rectificationType' },
    { title: '整改人', key: 'rectifier' },
    { title: '单据状态', key: 'status' },
]

// 表格数据
const tableData = ref([])

// 分页配置
const pagination = ref({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40],
})

// 图表引用
const responseRateChartRef = ref(null)
const diagnosisRateChartRef = ref(null)

// 图表实例
const charts = []

// 班组列表
const teams = ['电工一工位', '电工三工位', '电工四工位', '电工五工位', '内装电工', '校线一班', '校线二班', '调试组', '生产管理组', '质量过程组']

// 初始化及时响应率图表
const initResponseRateChart = () => {
    const chart = echarts.init(responseRateChartRef.value)
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
            data: teams,
            axisLabel: {
                interval: 0,
                rotate: 30,
            },
        },
        yAxis: {
            type: 'value',
            name: '响应率(%)',
            max: 100,
        },
        series: [
            {
                name: '及时响应率',
                type: 'bar',
                data: [92, 87, 95, 88, 91, 96, 89, 93, 97, 85],
            },
        ],
    }
    chart.setOption(option)
    charts.push(chart)
}

// 初始化及时诊断率图表
const initDiagnosisRateChart = () => {
    const chart = echarts.init(diagnosisRateChartRef.value)
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
            data: teams,
            axisLabel: {
                interval: 0,
                rotate: 30,
            },
        },
        yAxis: {
            type: 'value',
            name: '诊断率(%)',
            max: 100,
        },
        series: [
            {
                name: '及时诊断率',
                type: 'bar',
                data: [88, 82, 91, 85, 89, 93, 87, 90, 94, 81],
            },
        ],
    }
    chart.setOption(option)
    charts.push(chart)
}

// 处理状态变化
const handleStatusChange = (value) => {
    // TODO: 根据选中的状态更新表格数据
    updateTableData()
}

// 处理分页变化
const handlePageChange = (page) => {
    pagination.value.page = page
    updateTableData()
}

// 更新表格数据
const updateTableData = () => {
    // 使用CSV中的真实数据
    const mockData = [
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000023',
            carNo: '校线（5车）',
            configName: '电缆',
            phenomenonType: '未绑扎',
            startTime: '2025-04-08 15:05:05',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000024',
            carNo: '校线（5车）',
            configName: '终端',
            phenomenonType: '点位不符图',
            startTime: '2025-04-08 15:06:02',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000025',
            carNo: '校线（5车）',
            configName: '电缆',
            phenomenonType: '长度错',
            startTime: '2025-04-08 15:08:46',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000026',
            carNo: '校线（5车）',
            configName: '电缆',
            phenomenonType: '长度错',
            startTime: '2025-04-08 15:08:46',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000027',
            carNo: '校线（5车）',
            configName: '终端',
            phenomenonType: '毛刺',
            startTime: '2025-04-08 15:10:24',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000031',
            carNo: '校线（5车）',
            configName: '电缆',
            phenomenonType: '缺失',
            startTime: '2025-04-08 15:10:24',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000033',
            carNo: '校线（5车）',
            configName: '终端',
            phenomenonType: '点位不符图',
            startTime: '2025-04-08 15:10:24',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000028',
            carNo: '校线（5车）',
            configName: '电缆',
            phenomenonType: '缺失',
            startTime: '2025-04-08 15:10:24',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000030',
            carNo: '校线（5车）',
            configName: '终端',
            phenomenonType: '点位不符图',
            startTime: '2025-04-08 15:10:24',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        },
        {
            projectNo: 'B2311B01',
            trackingNo: 'XXYC-250408-00000032',
            carNo: '校线（5车）',
            configName: '标签',
            phenomenonType: '缺失',
            startTime: '2025-04-08 15:10:24',
            initiator: '彭好平',
            rectificationType: '内部责任(城轨事业部)',
            rectifier: '李浩',
            status: '未响应',
        }
    ]
    tableData.value = mockData
    pagination.value.itemCount = 150
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
    initResponseRateChart()
    initDiagnosisRateChart()
    updateTableData()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    charts.forEach((chart) => chart.dispose())
})
</script>

<style scoped>
.process-control {
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

.mb-4 {
    margin-bottom: 16px;
}

.card-value {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
}

.detail-table-card {
    margin-top: 16px;
}
</style>
