import request from '@/utils/request'

// 获取部门统计数据
export function getDepartmentStats() {
    return request({
        url: '/staff_improvement_analysis/target_completion',
        method: 'get'
    })
}

// 获取最后更新时间
export function getLastUpdateTime() {
    return request({
        url: '/staff_improvement_analysis/last_update_time',
        method: 'get'
    })
} 