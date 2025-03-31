import * as ExcelJS from 'exceljs'

/**
 * 导出全员型改善审核完成情况Excel
 * @param {Object} data 数据对象
 */
export const exportAuditCompletionExcel = (data) => {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('审核完成情况')

    // 设置表头
    worksheet.columns = [
        { header: '部门', key: 'department', width: 15 },
        { header: '组室', key: 'subDepartment', width: 15 },
        { header: '审核完成率', key: 'rate', width: 12 },
        { header: '已审核提案数', key: 'completed', width: 12 },
        { header: '已提交提案数', key: 'target', width: 12 },
    ]

    // 添加数据
    data.forEach((dept) => {
        // 添加部门行
        worksheet.addRow({
            department: dept.m_name,
            subDepartment: '',
            rate: `${dept.rate.toFixed(1)}%`,
            completed: dept.completed,
            target: dept.target,
        })

        // 添加组室行
        dept.sub.forEach((sub) => {
            worksheet.addRow({
                department: '',
                subDepartment: sub.m_name,
                rate: `${sub.rate.toFixed(1)}%`,
                completed: sub.completed,
                target: sub.target,
            })
        })

        // 添加空行分隔
        worksheet.addRow({})
    })

    // 设置样式
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' },
    }

    // 生成并下载文件
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `全员型改善审核完成情况_${new Date().toLocaleDateString()}.xlsx`
        link.click()
        window.URL.revokeObjectURL(url)
    })
}
