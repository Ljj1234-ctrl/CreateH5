<template>
  <el-form label-width="110px">
    <el-form-item label="提交按钮文案">
      <el-input v-model="model.signup!.submitText" />
    </el-form-item>
    <el-form-item label="成功提示">
      <el-input v-model="model.signup!.successToast" />
    </el-form-item>

    <el-divider content-position="left">表单字段</el-divider>

    <div class="list">
      <el-card v-for="(f, idx) in model.signup!.fields" :key="f.key + idx" class="item" shadow="never">
        <div class="row">
          <el-form-item label="key" class="cell">
            <el-input v-model="f.key" placeholder="例如 name/phone" />
          </el-form-item>
          <el-form-item label="label" class="cell">
            <el-input v-model="f.label" placeholder="例如 姓名/手机号" />
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="类型" class="cell">
            <el-select v-model="f.type" style="width: 100%">
              <el-option label="文本" value="text" />
              <el-option label="手机号" value="phone" />
              <el-option label="邮箱" value="email" />
            </el-select>
          </el-form-item>
          <el-form-item label="必填" class="cell">
            <el-switch v-model="f.required" />
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="占位符" class="cell">
            <el-input v-model="f.placeholder" />
          </el-form-item>
          <div class="actions">
            <el-button type="danger" plain @click="remove(idx)">删除</el-button>
          </div>
        </div>
      </el-card>

      <el-button @click="add">+ 添加字段</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityConfig, FormField } from '../../../types/activity'

const props = defineProps<{ modelValue: ActivityConfig }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: ActivityConfig): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function add() {
  const base: FormField = { key: `field_${model.value.signup!.fields.length + 1}`, label: '字段', type: 'text' }
  model.value.signup!.fields.push(base)
}

function remove(idx: number) {
  model.value.signup!.fields.splice(idx, 1)
}
</script>

<style scoped>
.list {
  display: grid;
  gap: 10px;
}
.item {
  background: #fafafa;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.cell :deep(.el-form-item__content) {
  width: 100%;
}
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

