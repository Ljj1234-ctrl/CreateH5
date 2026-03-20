<template>
  <div class="card">
    <div class="hd">活动说明</div>
    <div class="bd">
      <div v-for="(p, idx) in cfg.generic!.paragraphs" :key="idx" class="p">{{ p }}</div>
      <button class="btn" type="button" @click="go">{{ cfg.generic!.primaryButton.text }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityConfig } from '../../../types/activity'
import { useToast } from '../../../composables/useToast'

const props = defineProps<{ cfg: ActivityConfig }>()
const toast = useToast()

function go() {
  const link = props.cfg.generic?.primaryButton.link || ''
  if (!link) {
    toast.error('链接为空')
    return
  }
  window.location.href = link
}
</script>

<style scoped>
.card {
  margin-top: 12px;
  border-radius: 16px;
  border: 1px solid #ebeef5;
  background: #fff;
  overflow: hidden;
}
.hd {
  padding: 12px 12px 10px;
  font-weight: 800;
  color: #303133;
  border-bottom: 1px solid #f2f6fc;
}
.bd {
  padding: 12px;
  display: grid;
  gap: 10px;
}
.p {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
}
.btn {
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: #409eff;
  color: #fff;
  font-weight: 700;
}
</style>

