<template>
  <div class="card">
    <div class="hd">报名信息</div>
    <div class="bd">
      <div v-for="f in fields" :key="f.key" class="field">
        <div class="label">
          {{ f.label }}
          <span v-if="f.required" class="req">*</span>
        </div>
        <input
          class="input"
          :type="inputType(f.type)"
          v-model="values[f.key]"
          :placeholder="f.placeholder || '请输入'"
        />
      </div>
      <button class="submit" type="button" @click="submit">{{ cfg.signup!.submitText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { ActivityConfig, FormFieldType } from '../../../types/activity'
import { useToast } from '../../../composables/useToast'

const props = defineProps<{ cfg: ActivityConfig }>()
const toast = useToast()

const fields = computed(() => props.cfg.signup?.fields || [])
const values = reactive<Record<string, string>>({})

function inputType(t: FormFieldType) {
  if (t === 'phone') return 'tel'
  if (t === 'email') return 'email'
  return 'text'
}

function isPhone(v: string) {
  return /^1\d{10}$/.test(v)
}

function submit() {
  for (const f of fields.value) {
    const v = (values[f.key] || '').trim()
    if (f.required && !v) {
      toast.error(`${f.label}不能为空`)
      return
    }
    if (f.type === 'phone' && v && !isPhone(v)) {
      toast.error('手机号格式不正确')
      return
    }
  }
  toast.success(props.cfg.signup?.successToast || '提交成功')
  Object.keys(values).forEach((k) => (values[k] = ''))
}
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
.field {
  display: grid;
  gap: 6px;
}
.label {
  font-size: 13px;
  color: #606266;
}
.req {
  color: #f56c6c;
  margin-left: 2px;
}
.input {
  height: 42px;
  border-radius: 12px;
  border: 1px solid #dcdfe6;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
}
.input:focus {
  border-color: #409eff;
}
.submit {
  height: 44px;
  border-radius: 12px;
  border: 0;
  background: #409eff;
  color: #fff;
  font-weight: 700;
}
</style>

