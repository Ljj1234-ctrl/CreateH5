<template>
  <div class="wrap">
    <el-upload
      class="uploader"
      action="/api/upload"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :disabled="disabled"
    >
      <img v-if="modelValue" class="img" :src="modelValue" alt="cover" />
      <div v-else class="placeholder">
        <el-icon :size="20"><Plus /></el-icon>
        <div class="txt">上传图片</div>
      </div>
    </el-upload>
    <div class="tip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { useToast } from '../../composables/useToast'

const props = withDefaults(
  defineProps<{
    modelValue: string
    tip?: string
    disabled?: boolean
    maxSizeMB?: number
  }>(),
  { tip: '建议宽度 750px，支持 jpg/png/webp', disabled: false, maxSizeMB: 2 },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const toast = useToast()

function beforeUpload(file: File) {
  const okType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
  if (!okType) {
    toast.error('只支持 jpg/png/webp')
    return false
  }
  if (file.size > props.maxSizeMB * 1024 * 1024) {
    toast.error(`图片不能超过 ${props.maxSizeMB}MB`)
    return false
  }
  return true
}

function onSuccess(res: any) {
  if (res?.url) emit('update:modelValue', res.url)
  else toast.error('上传返回异常')
}

function onError() {
  toast.error('上传失败，请稍后重试')
}
</script>

<style scoped>
.wrap {
  display: grid;
  gap: 6px;
}
.uploader {
  width: 220px;
  height: 120px;
}
.img {
  width: 220px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #ebeef5;
}
.placeholder {
  width: 220px;
  height: 120px;
  border-radius: 10px;
  border: 1px dashed #dcdfe6;
  display: grid;
  place-items: center;
  color: #909399;
}
.txt {
  font-size: 12px;
  margin-top: -6px;
}
.tip {
  font-size: 12px;
  color: #909399;
}
</style>

