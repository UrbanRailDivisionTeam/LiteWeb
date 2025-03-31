<template>
    <div class="related-party-management">
        <!-- 数字卡片 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="5">
            <n-grid-item v-for="(card, index) in cards" :key="index">
                <n-card>
                    <template #header>
                        {{ card.title }}
                    </template>
                    <div class="card-value">{{ card.value }}</div>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- 折线图 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="2" class="mt-4">
            <n-grid-item>
                <n-card title="每日进入人数趋势">
                    <div ref="monthlyDailyChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="月度进入人数趋势">
                    <div ref="yearlyMonthlyChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- 柱状图 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="2" class="mt-4">
            <n-grid-item>
                <n-card title="本月作业类型分布">
                    <div ref="monthlyTypeChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="今日作业类型分布">
                    <div ref="dailyTypeChartRef" style="height: 300px"></div>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getRelatedPartyData } from '@/api/related_party'

// 数字卡片数据
const cards = ref([
    { title: '进入车间的相关方总人数', value: 0 },
    { title: '本月进入车间人数', value: 0 },
    { title: '今日进入车间人数', value: 0 },
    { title: '当前在车间人数', value: 0 },
    { title: '今日临时外出人数', value: 0 },
])

// 图表引用
const monthlyDailyChartRef = ref(null)
const yearlyMonthlyChartRef = ref(null)
const monthlyTypeChartRef = ref(null)
const dailyTypeChartRef = ref(null)

// 图表实例
let monthlyDailyChart = null
let yearlyMonthlyChart = null
let monthlyTypeChart = null
let dailyTypeChart = null

// 作业类型
const workTypes = ['家具维修及活动策划', '工装工具相关作业', '现场调研', '质量返工', '基建施工', '生产设备维修', '办公设备设施维修']

// 初始化图表
const initCharts = () => {
    // 每日进入人数趋势
    monthlyDailyChart = echarts.init(monthlyDailyChartRef.value)
    monthlyDailyChart.setOption({
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: Array.from({ length: 31 }, (_, i) => i + 1 + '日'),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)),
                type: 'line',
                smooth: true,
            },
        ],
    })

    // 月度进入人数趋势
    yearlyMonthlyChart = echarts.init(yearlyMonthlyChartRef.value)
    yearlyMonthlyChart.setOption({
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: Array.from({ length: 12 }, (_, i) => i + 1 + '月'),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
                type: 'line',
                smooth: true,
            },
        ],
    })

    // 本月作业类型分布
    monthlyTypeChart = echarts.init(monthlyTypeChartRef.value)
    monthlyTypeChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: workTypes,
            axisLabel: {
                interval: 0,
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: workTypes.map(() => Math.floor(Math.random() * 50)),
                type: 'bar',
            },
        ],
    })

    // 今日作业类型分布
    dailyTypeChart = echarts.init(dailyTypeChartRef.value)
    dailyTypeChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: workTypes,
            axisLabel: {
                interval: 0,
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: workTypes.map(() => Math.floor(Math.random() * 20)),
                type: 'bar',
            },
        ],
    })
}

// 调整图表大小
const handleResize = () => {
    monthlyDailyChart?.resize()
    yearlyMonthlyChart?.resize()
    monthlyTypeChart?.resize()
    dailyTypeChart?.resize()
}

onMounted(() => {
    // 等待 DOM 更新后再初始化图表
    setTimeout(() => {
        initCharts()
    }, 0)
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    monthlyDailyChart?.dispose()
    yearlyMonthlyChart?.dispose()
    monthlyTypeChart?.dispose()
    dailyTypeChart?.dispose()
})
</script>

<style scoped>
.related-party-management {
    padding: 16px;
}

.mt-4 {
    margin-top: 16px;
}

.card-value {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #18a058;
}
</style>
