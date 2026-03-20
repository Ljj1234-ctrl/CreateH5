import { defineStore } from 'pinia'
import type { ActivityConfig, ActivityListItem, TemplateKey } from '../types/activity'
import { api } from '../api/client'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    list: [] as ActivityListItem[],
    current: null as ActivityConfig | null,
    loading: false,
  }),
  actions: {
    async fetchList() {
      this.loading = true
      try {
        const { data } = await api.get<{ list: ActivityListItem[] }>('/list')
        this.list = data?.list || []
      } finally {
        this.loading = false
      }
    },
    async fetchConfig(id: string) {
      this.loading = true
      try {
        const { data } = await api.get<ActivityConfig>(`/config/${id}`)
        this.current = data || null
      } finally {
        this.loading = false
      }
    },
    async createConfig(payload: { template: TemplateKey; name?: string }) {
      const { data } = await api.post<{ id: string }>('/config', payload)
      return data.id
    },
    async saveConfig(id: string, config: ActivityConfig) {
      await api.put(`/config/${id}`, config)
    },
    async publish(id: string) {
      const { data } = await api.post<{ url: string }>(`/publish/${id}`)
      return data.url
    },
  },
})

