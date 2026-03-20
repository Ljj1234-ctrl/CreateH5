<template>
  <el-form label-width="110px">
    <el-form-item label="标题">
      <el-input v-model="model.download!.title" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="model.download!.desc" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item label="下载链接">
      <el-input v-model="model.download!.downloadUrl" placeholder="https://..." />
    </el-form-item>
    <el-form-item label="按钮文案">
      <el-input v-model="model.download!.buttonText" />
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
</script>

