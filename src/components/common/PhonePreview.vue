<template>
  <el-dialog v-model="open" width="420" :show-close="true" align-center>
    <template #header>
      <div class="header">
        <span>手机预览</span>
        <span class="sub">（H5 渲染页）</span>
      </div>
    </template>

    <div class="phone">
      <iframe class="iframe" :src="src" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  url: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const src = computed(() => props.url || 'about:blank')
</script>

<style scoped>
.header {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.sub {
  font-size: 12px;
  color: #909399;
}
.phone {
  width: 375px;
  height: 667px;
  margin: 0 auto;
  border: 1px solid #ebeef5;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background: #fff;
}
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

