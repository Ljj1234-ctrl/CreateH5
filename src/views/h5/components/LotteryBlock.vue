<template>
  <div class="card">
    <div class="hd">{{ cfg.lottery!.title }}</div>
    <div class="bd">
      <div class="grid">
        <div v-for="p in cfg.lottery!.prizes" :key="p.id" class="prize">{{ p.name }}</div>
      </div>
      <button class="btn" type="button" @click="draw">{{ cfg.lottery!.buttonText }}</button>
      <div class="tip">{{ cfg.lottery!.tipText }}</div>
      <div class="tip2">今日已抽：{{ done ? '是' : '否' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ActivityConfig, LotteryPrize } from '../../../types/activity'
import { useToast } from '../../../composables/useToast'

const props = defineProps<{ cfg: ActivityConfig }>()
const toast = useToast()
const done = ref(false)

const storageKey = computed(() => {
  const d = new Date()
  const day = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`
  return `lottery_${props.cfg.id}_${day}`
})

function pick(prizes: LotteryPrize[]) {
  const total = prizes.reduce((s, p) => s + Math.max(0, Number(p.weight) || 0), 0)
  if (total <= 0) return prizes[0]
  let r = Math.random() * total
  for (const p of prizes) {
    r -= Math.max(0, Number(p.weight) || 0)
    if (r <= 0) return p
  }
  return prizes[prizes.length - 1]
}

function draw() {
  if (localStorage.getItem(storageKey.value)) {
    done.value = true
    toast.error('今天已经抽过啦，明天再来～')
    return
  }
  const prizes = props.cfg.lottery?.prizes || []
  if (prizes.length === 0) {
    toast.error('奖品未配置')
    return
  }
  const p = pick(prizes)
  localStorage.setItem(storageKey.value, p.id)
  done.value = true
  toast.success(`恭喜你抽中：${p.name}`)
}

done.value = Boolean(localStorage.getItem(storageKey.value))
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
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.prize {
  padding: 12px 10px;
  border-radius: 14px;
  background: #f8f9fc;
  border: 1px solid #ebeef5;
  font-size: 13px;
  color: #303133;
  text-align: center;
}
.btn {
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: #f56c6c;
  color: #fff;
  font-weight: 700;
}
.tip {
  font-size: 12px;
  color: #909399;
  text-align: center;
}
.tip2 {
  font-size: 12px;
  color: #c0c4cc;
  text-align: center;
}
</style>

