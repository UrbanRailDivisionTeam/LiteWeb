import request from '@/utils/request'

// 获取全员型改善完成情况的部门统计数据
export async function getTauditCompletion() {
    return request({
        url: '/staff_improvement_analysis/target_completion',
        method: 'get',
    })
}

// 获取全员型改善审核情况的部门统计数据
export async function getAuditCompletion() {
    return request({
        url: '/staff_improvement_analysis/audit_completion',
        method: 'get',
    })
}

// 获取全员型改善完成情况的最后更新时间
export async function getLastUpdateTime() {
    return request({
        url: '/staff_improvement_analysis/last_update_time',
        method: 'get',
    })
}

// 获取全员型改善导出excel的表头
export async function getImprovementDetailsColumns() {
    return request({
        url: '/api/staff_improvement_analysis/data_columns',
        method: 'get',
    })
}

// 获取全员型改善导出excel的实际数据
export async function getImprovementDetailsData() {
    return request({
        url: '/api/staff_improvement_analysis/data',
        method: 'get',
    })
}