<template>
    <div class="workshop-task-container">
        <!-- 页面标题 -->
        <div class="page-title">
            <h2>车间任务量监测</h2>
        </div>

        <!-- 筛选区域 -->
        <n-card class="filter-section">
            <n-date-picker v-model:value="dateRange" type="daterange" clearable :is-date-disabled="disableFutureDate" @update:value="handleDateChange" :locale="zhCN" />
        </n-card>

        <!-- 顶部数字卡片区域 -->
        <div class="statistics-cards">
            <n-row :gutter="[16, 16]">
                <n-col :span="4">
                    <n-card>
                        <n-statistic label="今日人均任务量" :value="statistics.todayPerPerson" />
                    </n-card>
                </n-col>
                <n-col :span="4">
                    <n-card>
                        <n-statistic label="今日总任务量" :value="statistics.todayTotal" />
                    </n-card>
                </n-col>
                <n-col :span="4">
                    <n-card>
                        <n-statistic label="本月人均总任务量" :value="statistics.monthPerPerson" />
                    </n-card>
                </n-col>
                <n-col :span="4">
                    <n-card>
                        <n-statistic label="本月总任务量" :value="statistics.monthTotal" />
                    </n-card>
                </n-col>
                <n-col :span="4">
                    <n-card>
                        <n-statistic label="今日出勤人数" :value="statistics.todayAttendance" />
                    </n-card>
                </n-col>
            </n-row>
        </div>

        <!-- 图表区域 -->
        <div class="charts-container">
            <!-- 第一行图表 -->
            <n-row :gutter="[16, 16]" class="chart-row">
                <n-col :span="12">
                    <n-card title="总工作量趋势">
                        <div ref="totalWorkloadChart" class="chart"></div>
                    </n-card>
                </n-col>
                <n-col :span="12">
                    <n-card title="人均工作量趋势">
                        <div ref="perPersonWorkloadChart" class="chart"></div>
                    </n-card>
                </n-col>
            </n-row>

            <!-- 第二行图表 -->
            <n-row :gutter="[16, 16]" class="chart-row">
                <n-col :span="24">
                    <n-card title="员工出勤趋势">
                        <div ref="attendanceChart" class="chart"></div>
                    </n-card>
                </n-col>
            </n-row>

            <!-- 第三行图表 -->
            <n-row :gutter="[16, 16]" class="chart-row">
                <n-col :span="12">
                    <n-card title="今日班组人均工作量趋势">
                        <div ref="todayTeamWorkloadChart" class="chart"></div>
                    </n-card>
                </n-col>
                <n-col :span="12">
                    <n-card title="本月班组人均工作量趋势">
                        <div ref="monthTeamWorkloadChart" class="chart"></div>
                    </n-card>
                </n-col>
            </n-row>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NCard, NRow, NCol, NStatistic, NDatePicker } from 'naive-ui'
import { zhCN } from 'naive-ui'
import * as echarts from 'echarts'
import { getFullData } from './mockData'

// 日期范围
const dateRange = ref([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 本月第一天
    new Date(), // 今天
])

// 统计数据
const statistics = ref({
    todayPerPerson: 0,
    todayTotal: 0,
    monthPerPerson: 0,
    monthTotal: 0,
    todayAttendance: 0,
})

// 图表实例
const totalWorkloadChart = ref(null)
const perPersonWorkloadChart = ref(null)
const attendanceChart = ref(null)
const todayTeamWorkloadChart = ref(null)
const monthTeamWorkloadChart = ref(null)

// 图表实例数组
const charts = []

// 禁用未来日期
const disableFutureDate = (timestamp) => {
    return timestamp > Date.now()
}

// 处理日期变化
const handleDateChange = (value) => {
    if (!value) {
        // 如果清除了日期选择，重置为今天
        initData()
        return
    }

    const [startDate, endDate] = value
    updateData(startDate, endDate)
}

// 更新数据
const updateData = (startDate, endDate) => {
    const data = getFullData(startDate, endDate)

    // 更新统计数据
    statistics.value = {
        todayPerPerson: data.todayPerPerson,
        todayTotal: data.todayTotal,
        monthPerPerson: data.monthPerPerson,
        monthTotal: data.monthTotal,
        todayAttendance: data.todayAttendance,
    }

    // 更新图表数据
    updateChartsData(data)
}

// 更新图表数据
const updateChartsData = (data) => {
    // 总工作量趋势图
    charts[0].setOption({
        xAxis: {
            data: data.dates,
        },
        series: [
            {
                data: data.totalWorkload,
            },
        ],
    })

    // 人均工作量趋势图
    charts[1].setOption({
        xAxis: {
            data: data.dates,
        },
        series: [
            {
                data: data.perPersonWorkload,
            },
        ],
    })

    // 员工出勤趋势图
    charts[2].setOption({
        xAxis: {
            data: data.dates,
        },
        series: [
            {
                data: data.attendance,
            },
        ],
    })

    // 今日班组人均工作量趋势图
    charts[3].setOption({
        series: [
            {
                data: data.teamWorkload,
            },
        ],
    })

    // 本月班组人均工作量趋势图
    charts[4].setOption({
        series: [
            {
                data: data.teamWorkload,
            },
        ],
    })
}

// 初始化图表
const initCharts = (data) => {
    // 总工作量趋势图
    const totalWorkload = echarts.init(totalWorkloadChart.value)
    charts.push(totalWorkload)
    totalWorkload.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.dates,
            axisLabel: {
                formatter: '{value}日',
            },
        },
        yAxis: {
            type: 'value',
            name: '任务量/min',
        },
        series: [
            {
                data: data.totalWorkload,
                type: 'line',
                smooth: true,
            },
        ],
    })

    // 人均工作量趋势图
    const perPersonWorkload = echarts.init(perPersonWorkloadChart.value)
    charts.push(perPersonWorkload)
    perPersonWorkload.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.dates,
            axisLabel: {
                formatter: '{value}日',
            },
        },
        yAxis: {
            type: 'value',
            name: '任务量/min',
        },
        series: [
            {
                data: data.perPersonWorkload,
                type: 'line',
                smooth: true,
            },
        ],
    })

    // 员工出勤趋势图
    const attendance = echarts.init(attendanceChart.value)
    charts.push(attendance)
    attendance.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.dates,
            axisLabel: {
                formatter: '{value}日',
            },
        },
        yAxis: {
            type: 'value',
            name: '出勤人数',
        },
        series: [
            {
                data: data.attendance,
                type: 'line',
                smooth: true,
            },
        ],
    })

    // 今日班组人均工作量趋势图
    const todayTeamWorkload = echarts.init(todayTeamWorkloadChart.value)
    charts.push(todayTeamWorkload)
    todayTeamWorkload.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.teams,
            axisLabel: {
                interval: 0,
                rotate: 30,
            },
        },
        yAxis: {
            type: 'value',
            name: '任务量/min',
        },
        series: [
            {
                data: data.teamWorkload,
                type: 'bar',
            },
        ],
    })

    // 本月班组人均工作量趋势图
    const monthTeamWorkload = echarts.init(monthTeamWorkloadChart.value)
    charts.push(monthTeamWorkload)
    monthTeamWorkload.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: data.teams,
            axisLabel: {
                interval: 0,
                rotate: 30,
            },
        },
        yAxis: {
            type: 'value',
            name: '任务量/min',
        },
        series: [
            {
                data: data.teamWorkload,
                type: 'bar',
            },
        ],
    })
}

// 更新图表大小
const updateCharts = () => {
    charts.forEach((chart) => chart.resize())
}

// 监听窗口大小变化
const handleResize = () => {
    updateCharts()
}

// 初始化数据
const initData = () => {
    const [startDate, endDate] = dateRange.value
    const data = getFullData(startDate, endDate)
    statistics.value = {
        todayPerPerson: data.todayPerPerson,
        todayTotal: data.todayTotal,
        monthPerPerson: data.monthPerPerson,
        monthTotal: data.monthTotal,
        todayAttendance: data.todayAttendance,
    }
    initCharts(data)
}

onMounted(() => {
    initData()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    charts.forEach((chart) => chart.dispose())
})
</script>

<style scoped>
.workshop-task-container {
    padding: 20px;
}

.page-title {
    margin-bottom: 20px;
    text-align: center;
}

.page-title h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.filter-section {
    margin-bottom: 20px;
}

.statistics-cards {
    margin-bottom: 20px;
}

.chart-row {
    margin-bottom: 20px;
}

.chart {
    height: 300px;
    width: 100%;
}

:deep(.n-card) {
    background-color: #fff;
}

:deep(.n-card-header) {
    font-size: 16px;
    font-weight: bold;
}

:deep(.n-statistic) {
    text-align: center;
}

:deep(.n-statistic-value) {
    color: #18a058;
    font-size: 24px;
    font-weight: bold;
}

:deep(.n-statistic-label) {
    font-size: 14px;
    color: #666;
}
</style>
