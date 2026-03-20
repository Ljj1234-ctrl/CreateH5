<template>
  <div class="page">
    <div class="topbar">
      <div>
        <div class="title">运营活动页搭建平台</div>
        <div class="sub">小团队自用：配置文案/图片/按钮跳转，一键生成 H5</div>
      </div>
      <el-button type="primary" @click="openCreate = true">新建活动</el-button>
    </div>

    <el-card>
      <template #header>
        <div class="cardHeader">
          <span>活动列表</span>
          <el-button text @click="refresh">刷新</el-button>
        </div>
      </template>

      <div v-if="store.loading" class="center"><AppLoading /></div>

      <AppEmpty v-else-if="store.list.length === 0">
        <template #action>
          <el-button type="primary" @click="openCreate = true">新建一个</el-button>
        </template>
      </AppEmpty>

      <el-table v-else :data="store.list" size="small">
        <el-table-column prop="name" label="名称" min-width="160" />
        <el-table-column prop="template" label="模板" width="110" />
        <el-table-column prop="status" label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : 'info'">
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="170">
          <template #default="{ row }">{{ fmt(row.updatedAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="{ row }">
            <el-button size="small" @click="goEdit(row.id)">编辑</el-button>
            <el-button size="small" @click="openPreview(row.id)">预览</el-button>
            <el-button size="small" type="success" @click="doPublish(row.id)">发布</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="openCreate" width="520" title="选择模板创建" align-center>
      <div class="tplGrid">
        <el-card
          v-for="t in templates"
          :key="t.key"
          class="tpl"
          shadow="hover"
          @click="create(t.key)"
        >
          <div class="tplName">{{ t.name }}</div>
          <div class="tplDesc">{{ t.desc }}</div>
        </el-card>
      </div>
    </el-dialog>

    <PhonePreview v-model="previewOpen" :url="previewUrl" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActivityStore } from '../../stores/activity'
import { templates } from '../../templates/templates'
import type { TemplateKey } from '../../types/activity'
import { useToast } from '../../composables/useToast'
import AppLoading from '../../components/common/AppLoading.vue'
import AppEmpty from '../../components/common/AppEmpty.vue'
import PhonePreview from '../../components/common/PhonePreview.vue'

const store = useActivityStore()
const router = useRouter()
const toast = useToast()

const openCreate = ref(false)
const previewOpen = ref(false)
const previewUrl = ref('')

onMounted(() => {
  store.fetchList().catch((e) => toast.error(e.message))
})

function fmt(ts: number) {
  const d = new Date(ts)
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
    d.getMinutes(),
  )}`
}

async function refresh() {
  try {
    await store.fetchList()
  } catch (e: any) {
    toast.error(e.message)
  }
}

function goEdit(id: string) {
  router.push(`/admin/edit/${id}`)
}

async function create(key: TemplateKey) {
  try {
    const id = await store.createConfig({ template: key })
    openCreate.value = false
    router.push(`/admin/edit/${id}`)
  } catch (e: any) {
    toast.error(e.message)
  }
}

function openPreview(id: string) {
  previewUrl.value = `/h5/${id}`
  previewOpen.value = true
}

async function doPublish(id: string) {
  try {
    const url = await store.publish(id)
    toast.success('发布成功')
    previewUrl.value = url
    previewOpen.value = true
    await store.fetchList()
  } catch (e: any) {
    toast.error(e.message)
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
  align-items: flex-end;
  gap: 12px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
}
.sub {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
}
.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center {
  padding: 18px 0;
  display: grid;
  place-items: center;
}
.tplGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.tpl {
  cursor: pointer;
}
.tplName {
  font-weight: 700;
}
.tplDesc {
  margin-top: 6px;
  font-size: 12px;
  color: #909399;
}
</style>

