<template>
  <div class="page">
    <div class="topbar">
      <div class="left">
        <el-button @click="back">返回</el-button>
        <div class="title">配置编辑</div>
        <el-tag v-if="form" :type="form.status === 'published' ? 'success' : 'info'">
          {{ form.status === 'published' ? '已发布' : '草稿' }}
        </el-tag>
      </div>
      <div class="right">
        <el-button :disabled="!form" @click="preview">预览</el-button>
        <el-button :disabled="!form" type="primary" :loading="saving" @click="save">保存</el-button>
        <el-button :disabled="!form" type="success" :loading="publishing" @click="publish">发布</el-button>
      </div>
    </div>

    <el-card v-if="store.loading" class="center"><AppLoading /></el-card>

    <el-card v-else-if="!form">
      <AppEmpty title="找不到配置" desc="可能是 id 不存在，或接口异常" />
    </el-card>

    <div v-else class="grid">
      <el-card>
        <template #header>基础信息</template>
        <el-form label-width="100px" size="default">
          <el-form-item label="活动名称">
            <el-input v-model="form.name" placeholder="例如：春季体验课报名" />
          </el-form-item>
          <el-form-item label="模板类型">
            <el-input :model-value="tplName" disabled />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <template #header>头图与主文案</template>
        <el-form label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="form.hero.title" maxlength="30" show-word-limit />
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="form.hero.subTitle" maxlength="50" show-word-limit />
          </el-form-item>
          <el-form-item label="封面图">
            <ImageUploader v-model="form.hero.coverUrl" />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <template #header>主按钮（CTA）</template>
        <el-form label-width="100px">
          <el-form-item label="按钮文案">
            <el-input v-model="form.cta.text" />
          </el-form-item>
          <el-form-item label="跳转链接">
            <el-input v-model="form.cta.link" placeholder="https://... 或 #form/#vote" />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <template #header>模板配置</template>

        <el-alert
          v-if="form.template === 'signup'"
          type="info"
          show-icon
          title="报名模板：可配置字段、提交按钮和成功提示"
          class="mb12"
        />
        <el-alert
          v-else-if="form.template === 'vote'"
          type="info"
          show-icon
          title="投票模板：可配置选项、限制次数（演示版用 localStorage 简单限制）"
          class="mb12"
        />
        <el-alert
          v-else-if="form.template === 'lottery'"
          type="info"
          show-icon
          title="抽奖模板：配置奖品权重，前端随机抽取（演示版）"
          class="mb12"
        />
        <el-alert
          v-else-if="form.template === 'download'"
          type="info"
          show-icon
          title="下载模板：配置下载链接"
          class="mb12"
        />
        <el-alert
          v-else-if="form.template === 'coupon'"
          type="info"
          show-icon
          title="领券模板：配置券码，H5 支持复制"
          class="mb12"
        />

        <SignupPanel v-if="form.template === 'signup'" v-model="form" />
        <VotePanel v-else-if="form.template === 'vote'" v-model="form" />
        <LotteryPanel v-else-if="form.template === 'lottery'" v-model="form" />
        <DownloadPanel v-else-if="form.template === 'download'" v-model="form" />
        <CouponPanel v-else-if="form.template === 'coupon'" v-model="form" />
        <GenericPanel v-else v-model="form" />
      </el-card>
    </div>

    <PhonePreview v-model="previewOpen" :url="previewUrl" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActivityStore } from '../../stores/activity'
import { getTemplateMeta } from '../../templates/templates'
import type { ActivityConfig } from '../../types/activity'
import { useToast } from '../../composables/useToast'
import AppLoading from '../../components/common/AppLoading.vue'
import AppEmpty from '../../components/common/AppEmpty.vue'
import PhonePreview from '../../components/common/PhonePreview.vue'
import ImageUploader from '../../components/common/ImageUploader.vue'

import SignupPanel from './panels/SignupPanel.vue'
import VotePanel from './panels/VotePanel.vue'
import LotteryPanel from './panels/LotteryPanel.vue'
import DownloadPanel from './panels/DownloadPanel.vue'
import CouponPanel from './panels/CouponPanel.vue'
import GenericPanel from './panels/GenericPanel.vue'

const store = useActivityStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const form = ref<ActivityConfig | null>(null)
const saving = ref(false)
const publishing = ref(false)
const previewOpen = ref(false)
const previewUrl = ref('')

const id = computed(() => String(route.params.id || ''))
const tplName = computed(() => {
  if (!form.value) return ''
  return getTemplateMeta(form.value.template)?.name || form.value.template
})

onMounted(async () => {
  if (!id.value) {
    router.replace('/admin')
    return
  }
  try {
    await store.fetchConfig(id.value)
    form.value = store.current ? JSON.parse(JSON.stringify(store.current)) : null
  } catch (e: any) {
    toast.error(e.message)
    form.value = null
  }
})

function back() {
  router.push('/admin')
}

function preview() {
  previewUrl.value = `/h5/${id.value}?t=${Date.now()}`
  previewOpen.value = true
}

async function save() {
  if (!form.value) return
  saving.value = true
  try {
    form.value.updatedAt = Date.now()
    await store.saveConfig(id.value, form.value)
    toast.success('已保存')
  } catch (e: any) {
    toast.error(e.message)
  } finally {
    saving.value = false
  }
}

async function publish() {
  if (!form.value) return
  publishing.value = true
  try {
    await save()
    const url = await store.publish(id.value)
    toast.success('发布成功')
    previewUrl.value = url
    previewOpen.value = true
  } catch (e: any) {
    toast.error(e.message)
  } finally {
    publishing.value = false
  }
}
</script>

<style scoped>
.page {
  padding: 18px;
  display: grid;
  gap: 14px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.title {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.center {
  display: grid;
  place-items: center;
  min-height: 120px;
}
.mb12 {
  margin-bottom: 12px;
}
</style>

