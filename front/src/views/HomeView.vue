<script setup>
import { ref } from 'vue'
</script>

<template>
  <main class="home-container">
    <!-- 欢迎语 -->
    <section class="welcome-section">
      <h1>欢迎使用城轨数据中台---BI看板模块</h1>
      <p class="subtitle">在左侧选择您想要查看的模块</p>
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

.welcome-section {
  text-align: left;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}
</style>
