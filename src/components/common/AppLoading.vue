<template>
  <div class="wrap">
    <el-icon class="icon" :size="18"><Loading /></el-icon>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    text?: string
  }>(),
  { text: '加载中…' },
)
</script>

<style scoped>
.wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}
.icon {
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

