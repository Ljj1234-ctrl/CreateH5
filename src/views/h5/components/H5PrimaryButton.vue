<template>
  <button class="btn" type="button" @click="go">{{ text }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string; link: string }>()

function go() {
  const link = props.link || ''
  if (!link) return
  if (link.startsWith('#')) {
    const el = document.querySelector(link)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  window.location.href = link
}
</script>

<style scoped>
.btn {
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: linear-gradient(90deg, #409eff, #67c23a);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 10px 18px rgba(64, 158, 255, 0.18);
}
.btn:active {
  transform: scale(0.99);
}
</style>

