<template>
  <el-form label-width="110px">
    <el-form-item label="模块标题">
      <el-input v-model="model.lottery!.title" />
    </el-form-item>
    <el-form-item label="按钮文案">
      <el-input v-model="model.lottery!.buttonText" />
    </el-form-item>
    <el-form-item label="提示文案">
      <el-input v-model="model.lottery!.tipText" />
    </el-form-item>

    <el-divider content-position="left">奖品配置（权重越大越容易中）</el-divider>
    <div class="grid">
      <el-card v-for="(p, idx) in model.lottery!.prizes" :key="p.id" class="opt" shadow="never">
        <el-form-item label="id">
          <el-input v-model="p.id" />
        </el-form-item>
        <el-form-item label="奖品名称">
          <el-input v-model="p.name" />
        </el-form-item>
        <el-form-item label="权重">
          <el-input-number v-model="p.weight" :min="1" :max="999" />
        </el-form-item>
        <div class="actions">
          <el-button type="danger" plain @click="remove(idx)">删除</el-button>
        </div>
      </el-card>

      <el-button @click="add">+ 添加奖品</el-button>
    </div>
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

function add() {
  const n = model.value.lottery!.prizes.length + 1
  model.value.lottery!.prizes.push({ id: `prize_${n}`, name: `奖品 ${n}`, weight: 10 })
}

function remove(idx: number) {
  model.value.lottery!.prizes.splice(idx, 1)
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
</style>

