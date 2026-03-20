<template>
  <el-form label-width="110px">
    <el-form-item label="段落文案">
      <el-input v-model="paragraphText" type="textarea" :rows="5" placeholder="一行一个段落" />
    </el-form-item>

    <el-divider content-position="left">主按钮</el-divider>
    <el-form-item label="按钮文案">
      <el-input v-model="model.generic!.primaryButton.text" />
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="model.generic!.primaryButton.link" placeholder="https://..." />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityConfig } from '../../../types/activity'

const props = defineProps<{ modelValue: ActivityConfig }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: ActivityConfig): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const paragraphText = computed({
  get: () => (model.value.generic?.paragraphs || []).join('\n'),
  set: (v) => {
    const lines = v
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    model.value.generic!.paragraphs = lines
  },
})
</script>

