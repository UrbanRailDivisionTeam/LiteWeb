import request from '@/utils/request'

// 获取城轨部门的树形结构
export async function getDepartmentTree() {
    return request({
        url: '/metro_address_directory/department_tree',
        method: 'get',
    })
}

// 获取城轨通讯录的实际数据
export async function getContactData() {
    return request({
        url: '/metro_address_directory/contact_data',
        method: 'get',
    })
}
