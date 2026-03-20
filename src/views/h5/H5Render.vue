<template>
  <div class="h5">
    <div v-if="loading" class="center">
      <AppLoading text="加载活动配置…" />
    </div>

    <div v-else-if="!cfg" class="center">
      <AppEmpty title="活动不存在" desc="请检查链接是否正确，或活动未创建" />
    </div>

    <div v-else class="content">
      <H5Hero :hero="cfg.hero" />

      <div class="cta">
        <H5PrimaryButton :text="cfg.cta.text" :link="cfg.cta.link" />
      </div>

      <SignupForm v-if="cfg.template === 'signup'" id="form" :cfg="cfg" />
      <VoteBlock v-else-if="cfg.template === 'vote'" id="vote" :cfg="cfg" />
      <LotteryBlock v-else-if="cfg.template === 'lottery'" id="lottery" :cfg="cfg" />
      <DownloadBlock v-else-if="cfg.template === 'download'" id="download" :cfg="cfg" />
      <CouponBlock v-else-if="cfg.template === 'coupon'" id="coupon" :cfg="cfg" />
      <GenericBlock v-else :cfg="cfg" />

      <div class="footer">由「运营活动页搭建平台」生成 · Demo</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../api/client'
import type { ActivityConfig } from '../../types/activity'
import AppLoading from '../../components/common/AppLoading.vue'
import AppEmpty from '../../components/common/AppEmpty.vue'
import H5Hero from './components/H5Hero.vue'
import H5PrimaryButton from './components/H5PrimaryButton.vue'
import SignupForm from './components/SignupForm.vue'
import VoteBlock from './components/VoteBlock.vue'
import LotteryBlock from './components/LotteryBlock.vue'
import DownloadBlock from './components/DownloadBlock.vue'
import CouponBlock from './components/CouponBlock.vue'
import GenericBlock from './components/GenericBlock.vue'

const route = useRoute()
const cfg = ref<ActivityConfig | null>(null)
const loading = ref(false)

onMounted(async () => {
  const id = String(route.params.id || '')
  if (!id) return
  loading.value = true
  try {
    const { data } = await api.get<ActivityConfig>(`/config/${id}`)
    cfg.value = data || null
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
  } catch {
    cfg.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.h5 {
  min-height: 100vh;
  background: #f6f7fb;
}
.content {
  max-width: 420px;
  margin: 0 auto;
  padding: 10px 12px 18px;
}
.center {
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding: 20px;
}
.cta {
  margin: 10px 0 12px;
}
.footer {
  margin-top: 18px;
  font-size: 12px;
  color: #909399;
  text-align: center;
}
</style>

