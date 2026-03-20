import type { ActivityConfig, TemplateKey } from '../types/activity'

function now() {
  return Date.now()
}

export type TemplateMeta = {
  key: TemplateKey
  name: string
  desc: string
  createDefault: () => Omit<ActivityConfig, 'id'>
}

export const templates: TemplateMeta[] = [
  {
    key: 'signup',
    name: '报名模板',
    desc: '常见活动报名，收集姓名/电话等信息',
    createDefault: () => ({
      name: '春季体验课报名',
      template: 'signup',
      status: 'draft',
      updatedAt: now(),
      hero: {
        title: '春季体验课报名',
        subTitle: '名额有限，先到先得',
        coverUrl: '',
      },
      cta: { text: '立即报名', link: '#form' },
      signup: {
        fields: [
          { key: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入姓名' },
          { key: 'phone', label: '手机号', type: 'phone', required: true, placeholder: '请输入手机号' },
        ],
        submitText: '提交报名',
        successToast: '报名成功，我们会尽快联系你～',
      },
    }),
  },
  {
    key: 'vote',
    name: '投票模板',
    desc: '选项投票，展示票数与限制次数',
    createDefault: () => ({
      name: '人气作品投票',
      template: 'vote',
      status: 'draft',
      updatedAt: now(),
      hero: {
        title: '人气作品投票',
        subTitle: '每人每天 1 票',
        coverUrl: '',
      },
      cta: { text: '去投票', link: '#vote' },
      vote: {
        title: '请选择你最喜欢的作品',
        options: [
          { id: 'a', label: '作品 A', imageUrl: '', count: 12 },
          { id: 'b', label: '作品 B', imageUrl: '', count: 9 },
          { id: 'c', label: '作品 C', imageUrl: '', count: 15 },
        ],
        perUserLimit: 1,
        buttonText: '提交投票',
      },
    }),
  },
  {
    key: 'lottery',
    name: '抽奖模板',
    desc: '转盘/按钮抽奖，配置奖品和权重',
    createDefault: () => ({
      name: '幸运抽奖',
      template: 'lottery',
      status: 'draft',
      updatedAt: now(),
      hero: {
        title: '幸运抽奖',
        subTitle: '每天都有机会，快来试试手气',
        coverUrl: '',
      },
      cta: { text: '立即抽奖', link: '#lottery' },
      lottery: {
        title: '点击按钮开始抽奖',
        prizes: [
          { id: 'p1', name: '优惠券 5 元', weight: 60 },
          { id: 'p2', name: '优惠券 20 元', weight: 30 },
          { id: 'p3', name: '周边礼品', weight: 10 },
        ],
        buttonText: '开始抽奖',
        tipText: '中奖后请截图联系运营同学领取～',
      },
    }),
  },
  {
    key: 'download',
    name: '下载模板',
    desc: 'App/资料下载页，配置下载链接',
    createDefault: () => ({
      name: '资料包下载',
      template: 'download',
      status: 'draft',
      updatedAt: now(),
      hero: {
        title: '资料包下载',
        subTitle: '一键下载，开箱即用',
        coverUrl: '',
      },
      cta: { text: '立即下载', link: '#download' },
      download: {
        title: '新手资料包',
        desc: '包含课程表、学习路径、模板文件等',
        downloadUrl: 'https://example.com',
        buttonText: '下载资料包',
      },
    }),
  },
  {
    key: 'coupon',
    name: '领券模板',
    desc: '展示券码/口令，复制领取',
    createDefault: () => ({
      name: '新客专享券',
      template: 'coupon',
      status: 'draft',
      updatedAt: now(),
      hero: {
        title: '新客专享券',
        subTitle: '下单立减，限时有效',
        coverUrl: '',
      },
      cta: { text: '领取优惠', link: '#coupon' },
      coupon: {
        title: '复制券码领取优惠',
        desc: '下单时输入券码即可使用',
        code: 'NEW2026',
        buttonText: '复制券码',
      },
    }),
  },
  {
    key: 'generic',
    name: '通用模板',
    desc: '简单图文 + 主按钮，适合各种短活动',
    createDefault: () => ({
      name: '通用活动页',
      template: 'generic',
      status: 'draft',
      updatedAt: now(),
      hero: {
        title: '通用活动页',
        subTitle: '这里放活动副标题/说明',
        coverUrl: '',
      },
      cta: { text: '立即参与', link: 'https://example.com' },
      generic: {
        paragraphs: ['活动时间：3.20-3.31', '活动规则：完成任务即可参与抽奖', '最终解释权归主办方所有'],
        primaryButton: { text: '去参与', link: 'https://example.com' },
      },
    }),
  },
]

export function getTemplateMeta(key: TemplateKey) {
  return templates.find((t) => t.key === key)
}

