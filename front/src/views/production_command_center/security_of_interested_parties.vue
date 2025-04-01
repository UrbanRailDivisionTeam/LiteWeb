<template>
    <div class="related-party-management">
        <!-- 标题 -->
        <div class="page-title">
            <h2>相关方管理看板</h2>
        </div>

        <!-- 数字卡片 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="5" class="mb-4">
            <n-grid-item v-for="(card, index) in cards" :key="index">
                <n-card>
                    <template #header>
                        {{ card.title }}
                    </template>
                    <div class="card-value">{{ card.value }}</div>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- 图表和列表区域 -->
        <n-grid :x-gap="12" :y-gap="8" :cols="24">
            <!-- 左侧图表区域 -->
            <n-grid-item :span="14">
                <!-- 折线图 -->
                <n-grid :x-gap="12" :y-gap="8" :cols="2" class="mb-4">
                    <n-grid-item>
                        <n-card title="每日进入人数趋势">
                            <div ref="monthlyDailyChartRef" style="height: 220px"></div>
                        </n-card>
                    </n-grid-item>
                    <n-grid-item>
                        <n-card title="月度进入人数趋势">
                            <div ref="yearlyMonthlyChartRef" style="height: 220px"></div>
                        </n-card>
                    </n-grid-item>
                </n-grid>

                <!-- 柱状图 -->
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                        <n-card title="今日作业类型分布">
                            <div ref="dailyTypeChartRef" style="height: 220px"></div>
                        </n-card>
                    </n-grid-item>
                    <n-grid-item>
                        <n-card title="本月作业类型分布">
                            <div ref="monthlyTypeChartRef" style="height: 220px"></div>
                        </n-card>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>

            <!-- 右侧滚动表格 -->
            <n-grid-item :span="10">
                <n-card title="危险作业人员信息" class="danger-list-card">
                    <n-data-table :columns="columns" :data="filteredDangerList" :pagination="false" :bordered="true" :single-line="false" :max-height="600" :scroll-y="600" ref="tableRef" />
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, h } from 'vue'
import * as echarts from 'echarts'
import { getRelatedPartyData, getDailyTrend, getMonthlyTrend, getMonthlyTypeDistribution, getDailyTypeDistribution, getCardData } from '@/api/related_party'
import { NTag, NInput, NGrid, NGridItem, NCard } from 'naive-ui'

// 数字卡片数据
const cards = ref([
    { title: '进入车间的相关方总人数', value: 0 },
    { title: '本月进入车间人数', value: 0 },
    { title: '今日进入车间人数', value: 0 },
    { title: '当前在车间人数', value: 0 },
    { title: '今日临时外出人数', value: 0 },
])

// 危险作业人员列表数据
const dangerList = ref([
    {
        name: '张三',
        contact: '13800138000',
        location: '1号车间',
        position: 'A-12',
        content: '高空作业-设备维修',
    },
    {
        name: '李四',
        contact: '13900139000',
        location: '2号车间',
        position: 'B-05',
        content: '动火作业-焊接',
    },
    {
        name: '王五',
        contact: '13700137000',
        location: '3号车间',
        position: 'C-08',
        content: '受限空间作业',
    },
    {
        name: '赵六',
        contact: '13600136000',
        location: '4号车间',
        position: 'D-15',
        content: '高空作业-设备安装',
    },
    {
        name: '钱七',
        contact: '13500135000',
        location: '5号车间',
        position: 'E-03',
        content: '动火作业-切割',
    },
])

// 筛选条件
const filters = ref({
    name: '',
    contact: '',
    location: '',
    position: '',
    content: '',
})

// 表格列定义
const columns = [
    {
        title: '相关方姓名',
        key: 'name',
        width: 100,
        filterOptionValue: filters.value.name,
        renderFilter: () => {
            return h(NInput, {
                value: filters.value.name,
                onUpdateValue: (val) => {
                    filters.value.name = val
                },
                placeholder: '请输入姓名',
            })
        },
    },
    {
        title: '联系方式',
        key: 'contact',
        width: 120,
        filterOptionValue: filters.value.contact,
        renderFilter: () => {
            return h(NInput, {
                value: filters.value.contact,
                onUpdateValue: (val) => {
                    filters.value.contact = val
                },
                placeholder: '请输入联系方式',
            })
        },
    },
    {
        title: '作业地点',
        key: 'location',
        width: 100,
        filterOptionValue: filters.value.location,
        renderFilter: () => {
            return h(NInput, {
                value: filters.value.location,
                onUpdateValue: (val) => {
                    filters.value.location = val
                },
                placeholder: '请输入作业地点',
            })
        },
    },
    {
        title: '台位/车道',
        key: 'position',
        width: 100,
        filterOptionValue: filters.value.position,
        renderFilter: () => {
            return h(NInput, {
                value: filters.value.position,
                onUpdateValue: (val) => {
                    filters.value.position = val
                },
                placeholder: '请输入台位/车道',
            })
        },
    },
    {
        title: '具体作业内容',
        key: 'content',
        width: 180,
        filterOptionValue: filters.value.content,
        renderFilter: () => {
            return h(NInput, {
                value: filters.value.content,
                onUpdateValue: (val) => {
                    filters.value.content = val
                },
                placeholder: '请输入作业内容',
            })
        },
    },
]

// 根据筛选条件过滤数据
const filteredDangerList = computed(() => {
    return dangerList.value.filter((item) => {
        return (
            item.name.includes(filters.value.name) &&
            item.contact.includes(filters.value.contact) &&
            item.location.includes(filters.value.location) &&
            item.position.includes(filters.value.position) &&
            item.content.includes(filters.value.content)
        )
    })
})

// 表格引用
const tableRef = ref(null)
let scrollInterval = null

// 自动滚动
const startAutoScroll = () => {
    scrollInterval = setInterval(() => {
        if (tableRef.value) {
            const container = tableRef.value.$el.querySelector('.n-data-table-body')
            if (container) {
                if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
                    container.scrollTop = 0
                } else {
                    container.scrollTop += 1
                }
            }
        }
    }, 50)
}

// 停止自动滚动
const stopAutoScroll = () => {
    if (scrollInterval) {
        clearInterval(scrollInterval)
        scrollInterval = null
    }
}

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
                rotate: 30,
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
                rotate: 30,
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
        startAutoScroll()
    }, 0)
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    monthlyDailyChart?.dispose()
    yearlyMonthlyChart?.dispose()
    monthlyTypeChart?.dispose()
    dailyTypeChart?.dispose()
    stopAutoScroll()
})
</script>

<style scoped>
.related-party-management {
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

.card-value {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #18a058;
}

.danger-list-card {
    height: 100%;
}

:deep(.n-data-table) {
    --n-th-color: #f5f7f9;
    --n-td-color: #ffffff;
    --n-th-font-weight: 600;
}

:deep(.n-data-table-td) {
    padding: 8px 12px;
}

:deep(.n-data-table-th) {
    padding: 8px 12px;
}

:deep(.n-card) {
    height: 100%;
}

:deep(.n-card__content) {
    padding: 12px;
}
</style>
