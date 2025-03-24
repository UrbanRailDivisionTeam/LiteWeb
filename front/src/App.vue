<script setup>
import { RouterView } from 'vue-router'
import { HomeFilled, Document, Fold, Expand, TrendCharts } from '@element-plus/icons-vue'
import { useLayoutStore } from './stores/layout'

const layoutStore = useLayoutStore()
</script>

<template>
    <el-container class="layout-container">
        <el-aside :width="layoutStore.isCollapse ? '64px' : '200px'" class="aside">
            <div class="collapse-btn">
                <el-button type="text" @click="layoutStore.toggleCollapse">
                    <el-icon>
                        <Fold v-if="!layoutStore.isCollapse" />
                        <Expand v-else />
                    </el-icon>
                </el-button>
            </div>
            <el-menu :default-active="$route.path" :collapse="layoutStore.isCollapse" :router="true"
                :collapse-transition="false" :unique-opened="true" :show-timeout="100" :hide-timeout="100"
                :menu-trigger="'click'" :popper-class="'custom-menu'">
                <el-menu-item index="/">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>

                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>全员型改善分析</span>
                    </template>
                    <el-menu-item index="/staff_improvement_analysis/target_completion">
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>指标完成情况</span>
                    </el-menu-item>
                    <el-menu-item index="/staff_improvement_analysis/audit_completion">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>评审完成情况</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.layout-container {
    height: 100vh;
}

.aside {
    background-color: #fff;
    transition: width 0.1s;
}

.collapse-btn {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
}

.collapse-btn .el-button {
    font-size: 18px;
    color: #303133;
}

.collapse-btn .el-button:hover {
    color: #409eff;
}

.header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    padding: 0 20px;
}

.el-main {
    background-color: #f0f2f5;
    padding: 20px;
}
</style>
