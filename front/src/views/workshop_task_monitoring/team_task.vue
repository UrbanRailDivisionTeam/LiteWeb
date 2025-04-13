<template>
    <div class="team-task-container">
        <!-- 标题 -->
        <div class="page-title">
            <h2>班组任务量监测</h2>
        </div>

        <!-- 筛选区域 -->
        <n-card class="filter-card">
            <n-space vertical>
                <n-select v-model:value="selectedWorkstation" :options="workstationOptions" placeholder="请选择工位" clearable @update:value="handleWorkstationChange" />
            </n-space>
        </n-card>

        <!-- 数字卡片 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="4" class="mb-4">
            <n-grid-item v-for="(card, index) in cards" :key="index">
                <n-card>
                    <template #header>
                        {{ card.title }}
                    </template>
                    <div class="card-value">{{ card.value }}</div>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- 图表区域 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="24">
            <!-- 第一行图表 -->
            <n-grid-item :span="12">
                <n-card title="本月总工作量趋势">
                    <div ref="totalWorkloadChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <n-grid-item :span="12">
                <n-card title="人均工作量趋势">
                    <div ref="perCapitaWorkloadChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <!-- 第二行图表 -->
            <n-grid-item :span="24">
                <n-card title="本月员工出勤趋势">
                    <div ref="attendanceChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { NSelect, NGrid, NGridItem, NCard, NSpace } from 'naive-ui'

// 工位选项
const workstationOptions = [
    { label: '电工一工位', value: 'electrician_1' },
    { label: '电工二工位', value: 'electrician_2' },
    { label: '电工三工位', value: 'electrician_3' },
    { label: '电工四工位', value: 'electrician_4' },
    { label: '管钳一工位', value: 'pipe_1' },
    { label: '管钳二工位', value: 'pipe_2' },
    { label: '粘接一工位', value: 'adhesive_1' },
    { label: '粘接二工位', value: 'adhesive_2' },
    { label: '内装一工位', value: 'interior_1' },
    { label: '内装二工位', value: 'interior_2' },
]

// 选中的工位
const selectedWorkstation = ref('electrician_1')

// 数字卡片数据
const cards = ref([
    { title: '今日人均任务量', value: '0' },
    { title: '本月人均任务量', value: '0' },
    { title: '今日总任务量', value: '0' },
    { title: '本月总任务量', value: '0' },
])

// 图表引用
const totalWorkloadChartRef = ref(null)
const perCapitaWorkloadChartRef = ref(null)
const attendanceChartRef = ref(null)

// 图表实例
let totalWorkloadChart = null
let perCapitaWorkloadChart = null
let attendanceChart = null

// 工位数据
const workstationData = {
    electrician_1: {
        name: '电工一工位',
        todayPerCapita: '52',
        monthPerCapita: '45',
        todayTotal: '208',
        monthTotal: '1800',
        workloadData: [120, 135, 140, 150, 145, 160, 155, 170, 165, 180, 175, 190, 185, 200, 195, 210, 205, 220, 215, 230, 225, 240, 235, 250, 245, 260, 255, 270, 265, 280],
        perCapitaData: [25, 28, 30, 32, 35, 33, 36, 38, 40, 42],
        attendanceData: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23],
    },
    electrician_2: {
        name: '电工二工位',
        todayPerCapita: '48',
        monthPerCapita: '42',
        todayTotal: '192',
        monthTotal: '1680',
        workloadData: [110, 125, 130, 140, 135, 150, 145, 160, 155, 170, 165, 180, 175, 190, 185, 200, 195, 210, 205, 220, 215, 230, 225, 240, 235, 250, 245, 260, 255, 270, 265, 280],
        perCapitaData: [22, 25, 27, 29, 31, 30, 33, 35, 37, 39],
        attendanceData: [7, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22],
    },
    electrician_3: {
        name: '电工三工位',
        todayPerCapita: '55',
        monthPerCapita: '48',
        todayTotal: '220',
        monthTotal: '1920',
        workloadData: [130, 145, 150, 160, 155, 170, 165, 180, 175, 190, 185, 200, 195, 210, 205, 220, 215, 230, 225, 240, 235, 250, 245, 260, 255, 270, 265, 280, 275, 290],
        perCapitaData: [28, 30, 32, 34, 36, 35, 38, 40, 42, 44],
        attendanceData: [9, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24],
    },
    electrician_4: {
        name: '电工四工位',
        todayPerCapita: '50',
        monthPerCapita: '44',
        todayTotal: '200',
        monthTotal: '1760',
        workloadData: [115, 130, 135, 145, 140, 155, 150, 165, 160, 175, 170, 185, 180, 195, 190, 205, 200, 215, 210, 225, 220, 235, 230, 245, 240, 255, 250, 265, 260, 275],
        perCapitaData: [24, 26, 28, 30, 32, 31, 34, 36, 38, 40],
        attendanceData: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23],
    },
    pipe_1: {
        name: '管钳一工位',
        todayPerCapita: '45',
        monthPerCapita: '40',
        todayTotal: '180',
        monthTotal: '1600',
        workloadData: [100, 115, 120, 130, 125, 140, 135, 150, 145, 160, 155, 170, 165, 180, 175, 190, 185, 200, 195, 210, 205, 220, 215, 230, 225, 240, 235, 250, 245, 260],
        perCapitaData: [20, 23, 25, 27, 29, 28, 31, 33, 35, 37],
        attendanceData: [6, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21],
    },
    pipe_2: {
        name: '管钳二工位',
        todayPerCapita: '47',
        monthPerCapita: '41',
        todayTotal: '188',
        monthTotal: '1640',
        workloadData: [105, 120, 125, 135, 130, 145, 140, 155, 150, 165, 160, 175, 170, 185, 180, 195, 190, 205, 200, 215, 210, 225, 220, 235, 230, 245, 240, 255, 250, 265],
        perCapitaData: [21, 24, 26, 28, 30, 29, 32, 34, 36, 38],
        attendanceData: [7, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22],
    },
    adhesive_1: {
        name: '粘接一工位',
        todayPerCapita: '53',
        monthPerCapita: '46',
        todayTotal: '212',
        monthTotal: '1840',
        workloadData: [125, 140, 145, 155, 150, 165, 160, 175, 170, 185, 180, 195, 190, 205, 200, 215, 210, 225, 220, 235, 230, 245, 240, 255, 250, 265, 260, 275, 270, 285],
        perCapitaData: [26, 29, 31, 33, 35, 34, 37, 39, 41, 43],
        attendanceData: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23],
    },
    adhesive_2: {
        name: '粘接二工位',
        todayPerCapita: '51',
        monthPerCapita: '45',
        todayTotal: '204',
        monthTotal: '1800',
        workloadData: [118, 133, 138, 148, 143, 158, 153, 168, 163, 178, 173, 188, 183, 198, 193, 208, 203, 218, 213, 228, 223, 238, 233, 248, 243, 258, 253, 268, 263, 278],
        perCapitaData: [25, 28, 30, 32, 34, 33, 36, 38, 40, 42],
        attendanceData: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23],
    },
    interior_1: {
        name: '内装一工位',
        todayPerCapita: '49',
        monthPerCapita: '43',
        todayTotal: '196',
        monthTotal: '1720',
        workloadData: [112, 127, 132, 142, 137, 152, 147, 162, 157, 172, 167, 182, 177, 192, 187, 202, 197, 212, 207, 222, 217, 232, 227, 242, 237, 252, 247, 262, 257, 272],
        perCapitaData: [23, 26, 28, 30, 32, 31, 34, 36, 38, 40],
        attendanceData: [7, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22],
    },
    interior_2: {
        name: '内装二工位',
        todayPerCapita: '54',
        monthPerCapita: '47',
        todayTotal: '216',
        monthTotal: '1880',
        workloadData: [128, 143, 148, 158, 153, 168, 163, 178, 173, 188, 183, 198, 193, 208, 203, 218, 213, 228, 223, 238, 233, 248, 243, 258, 253, 268, 263, 278, 273, 288],
        perCapitaData: [27, 30, 32, 34, 36, 35, 38, 40, 42, 44],
        attendanceData: [9, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24],
    },
}

// 生成日期数组
const generateDateArray = (startDate, endDate) => {
    const dates = []
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split('T')[0])
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}

// 生成随机数据
const generateRandomData = (length, min, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

// 初始化图表
const initCharts = () => {
    // 获取当前月份的天数
    const now = new Date()
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

    // 生成本月日期数组（只显示日期）
    const monthDates = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}日`)

    // 生成最近9天日期数组（前5天到后3天，只显示日期）
    const recentDates = []
    for (let i = -5; i <= 3; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        recentDates.push(`${date.getDate()}日`)
    }

    // 本月总工作量趋势图
    totalWorkloadChart = echarts.init(totalWorkloadChartRef.value)
    totalWorkloadChart.setOption({
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: monthDates,
            axisLabel: {
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
            name: '任务量/min',
        },
        series: [
            {
                data: generateRandomData(daysInMonth, 100, 500),
                type: 'line',
                smooth: true,
            },
        ],
    })

    // 人均工作量趋势图（改为柱状图）
    perCapitaWorkloadChart = echarts.init(perCapitaWorkloadChartRef.value)
    perCapitaWorkloadChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: recentDates,
            axisLabel: {
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
            name: '任务量/min',
        },
        series: [
            {
                data: generateRandomData(9, 20, 100),
                type: 'bar',
            },
        ],
    })

    // 员工出勤趋势图
    attendanceChart = echarts.init(attendanceChartRef.value)
    attendanceChart.setOption({
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: monthDates,
            axisLabel: {
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
            name: '出勤人数',
        },
        series: [
            {
                data: generateRandomData(daysInMonth, 5, 20),
                type: 'line',
                smooth: true,
            },
        ],
    })
}

// 调整图表大小
const handleResize = () => {
    totalWorkloadChart?.resize()
    perCapitaWorkloadChart?.resize()
    attendanceChart?.resize()
}

// 工位变更处理
const handleWorkstationChange = (value) => {
    if (value) {
        const data = workstationData[value]
        // 更新卡片数据
        cards.value = [
            { title: '今日人均任务量', value: data.todayPerCapita },
            { title: '本月人均任务量', value: data.monthPerCapita },
            { title: '今日总任务量', value: data.todayTotal },
            { title: '本月总任务量', value: data.monthTotal },
        ]

        // 更新图表数据
        totalWorkloadChart?.setOption({
            series: [{ data: data.workloadData }],
        })
        perCapitaWorkloadChart?.setOption({
            series: [{ data: data.perCapitaData }],
        })
        attendanceChart?.setOption({
            series: [{ data: data.attendanceData }],
        })
    } else {
        // 重置卡片数据
        cards.value = [
            { title: '今日人均任务量', value: '0' },
            { title: '本月人均任务量', value: '0' },
            { title: '今日总任务量', value: '0' },
            { title: '本月总任务量', value: '0' },
        ]

        // 重置图表数据
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
        totalWorkloadChart?.setOption({
            series: [{ data: generateRandomData(daysInMonth, 100, 500) }],
        })
        perCapitaWorkloadChart?.setOption({
            series: [{ data: generateRandomData(9, 20, 100) }],
        })
        attendanceChart?.setOption({
            series: [{ data: generateRandomData(daysInMonth, 5, 20) }],
        })
    }
}

onMounted(() => {
    // 等待 DOM 更新后再初始化图表
    setTimeout(() => {
        initCharts()
        // 初始化时触发工位变更处理
        handleWorkstationChange('electrician_1')
    }, 0)
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    totalWorkloadChart?.dispose()
    perCapitaWorkloadChart?.dispose()
    attendanceChart?.dispose()
})
</script>

<style scoped>
.team-task-container {
    padding: 16px;
}

.page-title {
    margin-bottom: 24px;
    text-align: center;
}

.page-title h2 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.mb-4 {
    margin-bottom: 16px;
}

.filter-card {
    margin-bottom: 16px;
}

.card-value {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #18a058;
}

:deep(.n-card) {
    height: 100%;
}

:deep(.n-card__content) {
    padding: 12px;
}
</style>
