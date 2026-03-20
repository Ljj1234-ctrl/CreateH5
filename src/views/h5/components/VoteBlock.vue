<template>
  <div class="card">
    <div class="hd">{{ cfg.vote!.title }}</div>
    <div class="bd">
      <div class="opts">
        <div
          v-for="opt in cfg.vote!.options"
          :key="opt.id"
          class="opt"
          :class="{ active: picked === opt.id }"
          @click="picked = opt.id"
        >
          <img class="img" :src="opt.imageUrl || placeholder" alt="img" />
          <div class="meta">
            <div class="name">{{ opt.label }}</div>
            <div class="count">{{ (opt.count || 0) + localExtra[opt.id] }} 票</div>
          </div>
        </div>
      </div>
      <button class="submit" type="button" @click="submit">{{ cfg.vote!.buttonText }}</button>
      <div class="tip">今日已投：{{ todayCount }}/{{ cfg.vote!.perUserLimit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { ActivityConfig } from '../../../types/activity'
import { useToast } from '../../../composables/useToast'

const props = defineProps<{ cfg: ActivityConfig }>()
const toast = useToast()
const picked = ref('')
const localExtra = reactive<Record<string, number>>({})

const placeholder =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="140"><rect width="100%" height="100%" fill="#f2f6fc"/><text x="50%" y="50%" font-size="14" fill="#909399" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>`,
  )

const storageKey = computed(() => {
  const d = new Date()
  const day = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`
  return `vote_${props.cfg.id}_${day}`
})

const todayCount = computed(() => {
  const raw = localStorage.getItem(storageKey.value)
  const n = raw ? Number(raw) : 0
  return Number.isFinite(n) ? n : 0
})

function submit() {
  if (!picked.value) {
    toast.warning('请选择一个选项')
    return
  }
  if (todayCount.value >= props.cfg.vote!.perUserLimit) {
    toast.error('今天已经投过啦，明天再来～')
    return
  }
  localStorage.setItem(storageKey.value, String(todayCount.value + 1))
  localExtra[picked.value] = (localExtra[picked.value] || 0) + 1
  toast.success('投票成功')
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
.opts {
  display: grid;
  gap: 10px;
}
.opt {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 10px;
  border: 1px solid #ebeef5;
  border-radius: 14px;
  overflow: hidden;
  background: #fafafa;
}
.opt.active {
  border-color: #409eff;
  box-shadow: 0 10px 18px rgba(64, 158, 255, 0.12);
}
.img {
  width: 92px;
  height: 72px;
  object-fit: cover;
  background: #f2f6fc;
}
.meta {
  padding: 10px 10px 10px 0;
  display: grid;
  align-content: center;
  gap: 4px;
}
.name {
  font-weight: 700;
  color: #303133;
}
.count {
  font-size: 12px;
  color: #909399;
}
.submit {
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: #67c23a;
  color: #fff;
  font-weight: 700;
}
.tip {
  font-size: 12px;
  color: #909399;
  text-align: center;
}
</style>

