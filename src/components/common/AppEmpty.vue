<template>
  <div class="wrap">
    <div class="title">{{ title }}</div>
    <div class="desc">{{ desc }}</div>
    <div v-if="$slots.action" class="action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    desc?: string
  }>(),
  { title: '暂无数据', desc: '可以先新建一个活动配置' },
)
</script>

<style scoped>
.wrap {
  border: 1px dashed #dcdfe6;
  border-radius: 12px;
  padding: 28px 20px;
  text-align: center;
  color: #606266;
}
.title {
  font-weight: 600;
  color: #303133;
}
.desc {
  margin-top: 8px;
  font-size: 13px;
  color: #909399;
}
.action {
  margin-top: 14px;
}
</style>

