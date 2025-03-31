import request from '../utils/request'

// 获取相关方管理数据
export function getRelatedPartyData() {
  return request({
    url: '/api/related-party/data',
    method: 'get'
  })
}

// 获取每日进入人数趋势
export function getDailyTrend(params) {
  return request({
    url: '/api/related-party/daily-trend',
    method: 'get',
    params
  })
}

// 获取月度进入人数趋势
export function getMonthlyTrend(params) {
  return request({
    url: '/api/related-party/monthly-trend',
    method: 'get',
    params
  })
}

// 获取本月作业类型分布
export function getMonthlyTypeDistribution(params) {
  return request({
    url: '/api/related-party/monthly-type-distribution',
    method: 'get',
    params
  })
}

// 获取今日作业类型分布
export function getDailyTypeDistribution(params) {
  return request({
    url: '/api/related-party/daily-type-distribution',
    method: 'get',
    params
  })
}

// 获取数字卡片数据
export function getCardData() {
  return request({
    url: '/api/related-party/card-data',
    method: 'get'
  })
} 