<template>
  <el-form label-width="110px">
    <el-form-item label="模块标题">
      <el-input v-model="model.vote!.title" />
    </el-form-item>
    <el-form-item label="每人限制">
      <el-input-number v-model="model.vote!.perUserLimit" :min="1" :max="10" />
      <span class="tip">（演示版：localStorage 记录投票次数）</span>
    </el-form-item>
    <el-form-item label="按钮文案">
      <el-input v-model="model.vote!.buttonText" />
    </el-form-item>

    <el-divider content-position="left">投票选项</el-divider>

    <div class="grid">
      <el-card v-for="(opt, idx) in model.vote!.options" :key="opt.id" class="opt" shadow="never">
        <el-form-item label="id">
          <el-input v-model="opt.id" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="opt.label" />
        </el-form-item>
        <el-form-item label="图片">
          <ImageUploader v-model="opt.imageUrl" tip="可不填，留空则用占位图" />
        </el-form-item>
        <el-form-item label="票数(初始)">
          <el-input-number v-model="opt.count" :min="0" :max="99999" />
        </el-form-item>
        <div class="actions">
          <el-button type="danger" plain @click="remove(idx)">删除</el-button>
        </div>
      </el-card>

      <el-button @click="add">+ 添加选项</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityConfig } from '../../../types/activity'
import ImageUploader from '../../../components/common/ImageUploader.vue'

const props = defineProps<{ modelValue: ActivityConfig }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: ActivityConfig): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function add() {
  const n = model.value.vote!.options.length + 1
  model.value.vote!.options.push({ id: `opt_${n}`, label: `选项 ${n}`, imageUrl: '', count: 0 })
}

function remove(idx: number) {
  model.value.vote!.options.splice(idx, 1)
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
}
.opt {
  background: #fafafa;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.tip {
  margin-left: 8px;
  font-size: 12px;
  color: #909399;
}
</style>

