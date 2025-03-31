<script setup>
import { NButton, NCollapse, NCollapseItem } from 'naive-ui'
import { ArrowDownOutline as ArrowDownloadIcon } from '@vicons/ionicons5'
import { exportAuditCompletionExcel } from '@/utils/excel_export'

// 模拟数据，实际应该从API获取
const mockData = [
    {
        m_name: '质量技术部',
        rate: 95.2,
        completed: 60,
        target: 63,
        sub: [
            { m_name: '质量保证组', rate: 100, completed: 10, target: 10 },
            { m_name: '交付质量组', rate: 95, completed: 19, target: 20 },
            { m_name: '过程质量组', rate: 88, completed: 22, target: 25 },
        ],
    },
    {
        m_name: '项目工程部',
        rate: 97.3,
        completed: 36,
        target: 37,
        sub: [
            { m_name: '交车进程组', rate: 100, completed: 8, target: 8 },
            { m_name: '生产管理组', rate: 93, completed: 14, target: 15 },
        ],
    },
]

const handleExportExcel = () => {
    exportAuditCompletionExcel(mockData)
}
</script>

<template>
    <main class="home-container">
        <!-- 欢迎语 -->
        <section>
            <n-h1>欢迎使用城轨数据中台---BI看板模块</n-h1>
            <n-h2>在左侧选择您想要查看的分析展现</n-h2>
            <n-h2>在下方选择想要导出的数据</n-h2>

            <n-collapse class="export-collapse">
                <n-collapse-item title="改善数据导出" name="0">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部改善明细
                    </n-button>
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部改善指标详情
                    </n-button>
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部改善审核详情
                    </n-button>
                </n-collapse-item>
                <n-collapse-item title="异常数据导出" name="1">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部异常明细情况
                    </n-button>
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出质量技术部组室和项目的异常情况
                    </n-button>
                </n-collapse-item>
                <n-collapse-item title="差旅数据导出" name="2">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部制造差旅明细
                    </n-button>
                </n-collapse-item>
                <n-collapse-item title="工时数据导出" name="3">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部人员工时明细
                    </n-button>
                </n-collapse-item>
                <n-collapse-item title="考勤数据导出" name="4">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部考勤明细
                    </n-button>
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部打卡记录明细
                    </n-button>
                </n-collapse-item>
                <n-collapse-item title="业联数据导出" name="5">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出当前未完业联明细
                    </n-button>
                </n-collapse-item>
                <n-collapse-item title="通讯录导出" name="6">
                    <n-button type="primary" @click="handleExportExcel" class="export-btn">
                        <template #icon>
                            <ArrowDownloadIcon />
                        </template>
                        导出城轨事业部人员相关信息明细
                    </n-button>
                </n-collapse-item>
            </n-collapse>
        </section>
    </main>
</template>

<style scoped>
.home-container {
    max-width: 1200px;
    margin: 0;
    padding: 2rem;
    min-height: 100%;
}

.export-collapse {
    max-width: 600px;
    margin-top: 2rem;
}

.export-collapse :deep(.n-collapse-item__header) {
    font-size: 1.2rem;
    font-weight: 500;
}

.export-collapse :deep(.n-collapse-item__content-wrapper) {
    max-height: 300px;
    overflow-y: auto;
}

.export-collapse :deep(.n-collapse-item__content) {
    padding: 16px;
}

.export-btn {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}
</style>
