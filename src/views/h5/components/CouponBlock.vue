<template>
  <div class="card">
    <div class="hd">{{ cfg.coupon!.title }}</div>
    <div class="bd">
      <div class="desc">{{ cfg.coupon!.desc }}</div>
      <div class="code">{{ cfg.coupon!.code }}</div>
      <button class="btn" type="button" @click="copy">{{ cfg.coupon!.buttonText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityConfig } from '../../../types/activity'
import { useToast } from '../../../composables/useToast'

const props = defineProps<{ cfg: ActivityConfig }>()
const toast = useToast()

async function copy() {
  const text = props.cfg.coupon?.code || ''
  if (!text) {
    toast.error('券码为空')
    return
  }
  try {
    await navigator.clipboard.writeText(text)
    toast.success('已复制')
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    toast.success('已复制')
  }
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
.desc {
  color: #606266;
  font-size: 13px;
  line-height: 1.5;
}
.code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  padding: 12px;
  border: 1px dashed #dcdfe6;
  border-radius: 12px;
  background: #fafafa;
  text-align: center;
  font-weight: 800;
  letter-spacing: 1px;
}
.btn {
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: #e6a23c;
  color: #fff;
  font-weight: 700;
}
</style>

