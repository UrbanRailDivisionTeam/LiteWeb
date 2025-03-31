import * as ExcelJS from 'exceljs'

/**
 * 导出根据输入生成Excel
 * @param {Object} data 数据对象
 */
export const exportExcel = (name, columns, data) => {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')
    // 设置表头
    worksheet.columns = columns
    // 添加数据
    data.forEach((dept) => { worksheet.addRow(dept) })

    // 生成并下载文件
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = name + `_${new Date().toLocaleDateString()}.xlsx`
        link.click()
        window.URL.revokeObjectURL(url)
    })
}
