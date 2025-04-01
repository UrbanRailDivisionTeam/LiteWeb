import request from '../utils/request'

// 作业类型列表
const workTypes = ['家具维修及活动策划', '工装工具相关作业', '现场调研', '质量返工', '基建施工', '生产设备维修', '办公设备设施维修']

// 模拟数据
const mockData = {
    cardData: [
        { title: '进入车间的相关方总人数', value: 156 },
        { title: '本月进入车间人数', value: 89 },
        { title: '今日进入车间人数', value: 12 },
        { title: '当前在车间人数', value: 8 },
        { title: '今日临时外出人数', value: 3 },
    ],
    dailyTrend: {
        dates: Array.from({ length: 31 }, (_, i) => i + 1 + '日'),
        values: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)),
    },
    monthlyTrend: {
        dates: Array.from({ length: 12 }, (_, i) => i + 1 + '月'),
        values: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
    },
    monthlyTypeDistribution: {
        types: workTypes,
        values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50)),
    },
    dailyTypeDistribution: {
        types: workTypes,
        values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20)),
    },
    relatedPartyList: [
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
    ],
}

// 获取所有相关方数据
export function getRelatedPartyData() {
    return Promise.resolve(mockData.relatedPartyList)
}

// 获取每日进入人数趋势
export function getDailyTrend() {
    return Promise.resolve(mockData.dailyTrend)
}

// 获取月度进入人数趋势
export function getMonthlyTrend() {
    return Promise.resolve(mockData.monthlyTrend)
}

// 获取本月作业类型分布
export function getMonthlyTypeDistribution() {
    return Promise.resolve(mockData.monthlyTypeDistribution)
}

// 获取今日作业类型分布
export function getDailyTypeDistribution() {
    return Promise.resolve(mockData.dailyTypeDistribution)
}

// 获取数字卡片数据
export function getCardData() {
    return Promise.resolve(mockData.cardData)
}
