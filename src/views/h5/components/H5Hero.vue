<template>
  <div class="hero">
    <div class="cover" :style="coverStyle" />
    <div class="txt">
      <div class="title">{{ hero.title }}</div>
      <div v-if="hero.subTitle" class="sub">{{ hero.subTitle }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HeroConfig } from '../../../types/activity'

const props = defineProps<{ hero: HeroConfig }>()

const coverStyle = computed(() => {
  if (props.hero.coverUrl) return { backgroundImage: `url(${props.hero.coverUrl})` }
  return {
    backgroundImage:
      'linear-gradient(135deg, rgba(64,158,255,0.25), rgba(245,108,108,0.18)), linear-gradient(135deg, #ffffff, #f2f6fc)',
  }
})
</script>

<style scoped>
.hero {
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #ebeef5;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.06);
}
.cover {
  height: 160px;
  background-size: cover;
  background-position: center;
}
.txt {
  padding: 12px 12px 14px;
}
.title {
  font-size: 18px;
  font-weight: 800;
  color: #1f2d3d;
  line-height: 1.2;
}
.sub {
  margin-top: 6px;
  font-size: 13px;
  color: #606266;
}
</style>

