<script setup>
import { ref, computed, h } from 'vue'
import { NCard, NInput, NTreeSelect, NDataTable, NTag } from 'naive-ui'
import { SearchOutline as SearchIcon } from '@vicons/ionicons5'

// 部门树形数据
const departmentTree = ref([
    {
        label: '城轨事业部',
        key: 'root',
        children: [
            {
                label: '质量技术部',
                key: 'quality',
                children: [
                    { label: '质量保证组', key: 'quality-assurance' },
                    { label: '交付质量组', key: 'delivery-quality' },
                    { label: '过程质量组', key: 'process-quality' },
                ],
            },
            {
                label: '项目工程部',
                key: 'project',
                children: [
                    { label: '交车进程组', key: 'delivery-process' },
                    { label: '生产管理组', key: 'production' },
                    { label: '现场安全组', key: 'safety' },
                ],
            },
            {
                label: '综合管理部',
                key: 'management',
                children: [
                    { label: '人力资源组', key: 'hr' },
                    { label: '经营计划组', key: 'business-plan' },
                    { label: '财务管理组', key: 'finance' },
                ],
            },
        ],
    },
])

// 选中的部门
const selectedDepartment = ref(null)

// 搜索关键词
const searchKeyword = ref('')

// 表格列定义
const columns = [
    { title: '姓名', key: 'name', width: 120 },
    { title: '工号', key: 'employeeId', width: 100 },
    { title: '部门', key: 'department', width: 150 },
    { title: '职位', key: 'position', width: 120 },
    { title: '电话', key: 'phone', width: 120 },
    { title: '邮箱', key: 'email', width: 200 },
    {
        title: '状态',
        key: 'status',
        width: 100,
        render(row) {
            return h(
                NTag,
                {
                    type: row.status === '在职' ? 'success' : 'warning',
                },
                { default: () => row.status },
            )
        },
    },
]

// 模拟联系人数据
const contactData = ref([
    {
        id: 1,
        name: '张三',
        employeeId: 'EMP001',
        department: '质量技术部/质量保证组',
        position: '组长',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        status: '在职',
    },
    {
        id: 2,
        name: '李四',
        employeeId: 'EMP002',
        department: '项目工程部/交车进程组',
        position: '工程师',
        phone: '13800138001',
        email: 'lisi@example.com',
        status: '在职',
    },
    {
        id: 3,
        name: '王五',
        employeeId: 'EMP003',
        department: '综合管理部/人力资源组',
        position: '主管',
        phone: '13800138002',
        email: 'wangwu@example.com',
        status: '在职',
    },
])

// 过滤后的联系人数据
const filteredContacts = computed(() => {
    if (!searchKeyword.value) return contactData.value

    const keyword = searchKeyword.value.toLowerCase()
    return contactData.value.filter(
        (contact) =>
            contact.name.toLowerCase().includes(keyword) ||
            contact.employeeId.toLowerCase().includes(keyword) ||
            contact.department.toLowerCase().includes(keyword) ||
            contact.position.toLowerCase().includes(keyword) ||
            contact.phone.includes(keyword) ||
            contact.email.toLowerCase().includes(keyword),
    )
})

// 处理部门选择
const handleDepartmentSelect = (value) => {
    selectedDepartment.value = value
    // 这里可以根据选中的部门筛选联系人数据
}
</script>

<template>
    <div class="contact-container">
        <n-card class="contact-card">
            <template #header>
                <div class="card-header">
                    <h2>城轨通讯录</h2>
                    <div class="search-box">
                        <n-input v-model:value="searchKeyword" placeholder="搜索联系人..." clearable>
                            <template #prefix>
                                <SearchIcon />
                            </template>
                        </n-input>
                    </div>
                </div>
            </template>

            <div class="content-wrapper">
                <!-- 左侧部门树 -->
                <div class="department-tree">
                    <n-tree-select v-model:value="selectedDepartment" :options="departmentTree" placeholder="选择部门" clearable @update:value="handleDepartmentSelect" />
                </div>

                <!-- 右侧联系人表格 -->
                <div class="contact-table">
                    <n-data-table
                        :columns="columns"
                        :data="filteredContacts"
                        :pagination="{
                            pageSize: 10,
                            showSizePicker: true,
                            pageSizes: [10, 20, 30, 40],
                        }"
                        striped
                        bordered
                    />
                </div>
            </div>
        </n-card>
    </div>
</template>

<style scoped>
.contact-container {
    padding: 20px;
}

.contact-card {
    min-height: calc(100vh - 40px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
}

.search-box {
    width: 300px;
}

.content-wrapper {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.department-tree {
    width: 200px;
    flex-shrink: 0;
}

.contact-table {
    flex: 1;
    min-width: 0;
}

:deep(.n-data-table) {
    height: calc(100vh - 200px);
}
</style>
