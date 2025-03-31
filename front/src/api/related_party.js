import request from '@/utils/request'

// 获取相关方管理数据
export async function getRelatedPartyData() {
    return request({
        url: '/api/related_party/data',
        method: 'get',
    })
}

// 获取每日进入人数趋势
export async function getDailyTrend() {
    return request({
        url: '/api/related_party/daily_trend',
        method: 'get',
    })
}

// 获取月度进入人数趋势
export async function getMonthlyTrend() {
    return request({
        url: '/api/related_party/monthly_trend',
        method: 'get'
    })
}

// 获取本月作业类型分布
export async function getMonthlyTypeDistribution() {
    return request({
        url: '/api/related_party/monthly_type_distribution',
        method: 'get',
    })
}

// 获取今日作业类型分布
export async function getDailyTypeDistribution() {
    return request({
        url: '/api/related_party/daily_type_distribution',
        method: 'get',
    })
}

// 获取数字卡片数据
export async function getCardData() {
    return request({
        url: '/api/related_party/card_data',
        method: 'get',
    })
}
