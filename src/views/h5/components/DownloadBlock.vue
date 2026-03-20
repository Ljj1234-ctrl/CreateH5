<template>
  <div class="card">
    <div class="hd">{{ cfg.download!.title }}</div>
    <div class="bd">
      <div class="desc">{{ cfg.download!.desc }}</div>
      <button class="btn" type="button" @click="go">{{ cfg.download!.buttonText }}</button>
      <div class="tip">链接：{{ cfg.download!.downloadUrl }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityConfig } from '../../../types/activity'
import { useToast } from '../../../composables/useToast'

const props = defineProps<{ cfg: ActivityConfig }>()
const toast = useToast()

function go() {
  const url = props.cfg.download?.downloadUrl
  if (!url) {
    toast.error('下载链接为空')
    return
  }
  window.location.href = url
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
.btn {
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: #409eff;
  color: #fff;
  font-weight: 700;
}
.tip {
  font-size: 12px;
  color: #c0c4cc;
  word-break: break-all;
  text-align: center;
}
</style>

