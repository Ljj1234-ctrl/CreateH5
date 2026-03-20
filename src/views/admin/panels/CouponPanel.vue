<template>
  <el-form label-width="110px">
    <el-form-item label="标题">
      <el-input v-model="model.coupon!.title" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="model.coupon!.desc" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item label="券码/口令">
      <el-input v-model="model.coupon!.code" />
    </el-form-item>
    <el-form-item label="按钮文案">
      <el-input v-model="model.coupon!.buttonText" />
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

