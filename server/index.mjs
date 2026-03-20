import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { nanoid } from 'nanoid'

const PORT = 5175
const ROOT = process.cwd()
const DATA_DIR = path.join(ROOT, 'server', 'data')
const DB_FILE = path.join(DATA_DIR, 'db.json')
const UPLOAD_DIR = path.join(ROOT, 'server', 'uploads')

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function ensureDB() {
  ensureDir(DATA_DIR)
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ configs: [] }, null, 2), 'utf-8')
  }
}

function readDB() {
  ensureDB()
  const raw = fs.readFileSync(DB_FILE, 'utf-8')
  try {
    return JSON.parse(raw)
  } catch {
    return { configs: [] }
  }
}

function writeDB(db) {
  ensureDB()
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8')
}

function now() {
  return Date.now()
}

function createDefaultConfig(template) {
  const base = {
    id: nanoid(8),
    name: '新建活动',
    template,
    status: 'draft',
    updatedAt: now(),
    hero: { title: '新建活动', subTitle: '这里是副标题', coverUrl: '' },
    cta: { text: '立即参与', link: '#form' },
  }

  if (template === 'signup') {
    return {
      ...base,
      cta: { text: '立即报名', link: '#form' },
      signup: {
        fields: [
          { key: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入姓名' },
          { key: 'phone', label: '手机号', type: 'phone', required: true, placeholder: '请输入手机号' },
        ],
        submitText: '提交报名',
        successToast: '报名成功，我们会尽快联系你～',
      },
    }
  }

  if (template === 'vote') {
    return {
      ...base,
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
    }
  }

  if (template === 'lottery') {
    return {
      ...base,
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
    }
  }

  if (template === 'download') {
    return {
      ...base,
      cta: { text: '立即下载', link: '#download' },
      download: {
        title: '资料包下载',
        desc: '这里放下载描述…',
        downloadUrl: 'https://example.com',
        buttonText: '下载',
      },
    }
  }

  if (template === 'coupon') {
    return {
      ...base,
      cta: { text: '领取优惠', link: '#coupon' },
      coupon: {
        title: '复制券码领取优惠',
        desc: '下单时输入券码即可使用',
        code: 'NEW2026',
        buttonText: '复制券码',
      },
    }
  }

  return {
    ...base,
    template: 'generic',
    cta: { text: '立即参与', link: 'https://example.com' },
    generic: {
      paragraphs: ['活动时间：', '活动规则：', '最终解释权归主办方所有'],
      primaryButton: { text: '去参与', link: 'https://example.com' },
    },
  }
}

ensureDir(UPLOAD_DIR)
ensureDB()

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '')
    cb(null, `${Date.now()}_${nanoid(6)}${ext}`)
  },
})

const upload = multer({ storage })

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use('/uploads', express.static(UPLOAD_DIR))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.get('/api/list', (_req, res) => {
  const db = readDB()
  const list = (db.configs || []).map((c) => ({
    id: c.id,
    name: c.name,
    template: c.template,
    status: c.status,
    updatedAt: c.updatedAt,
    publishedAt: c.publishedAt,
  }))
  res.json({ list })
})

app.post('/api/config', (req, res) => {
  const { template, name } = req.body || {}
  const cfg = createDefaultConfig(template)
  if (name) cfg.name = String(name).slice(0, 50)
  cfg.hero.title = cfg.name

  const db = readDB()
  db.configs = db.configs || []
  db.configs.unshift(cfg)
  writeDB(db)
  res.json({ id: cfg.id })
})

app.get('/api/config/:id', (req, res) => {
  const db = readDB()
  const cfg = (db.configs || []).find((c) => c.id === req.params.id)
  if (!cfg) {
    res.status(404).json({ message: '配置不存在' })
    return
  }
  res.json(cfg)
})

app.put('/api/config/:id', (req, res) => {
  const db = readDB()
  db.configs = db.configs || []
  const idx = db.configs.findIndex((c) => c.id === req.params.id)
  if (idx === -1) {
    res.status(404).json({ message: '配置不存在' })
    return
  }
  const body = req.body || {}
  body.id = req.params.id
  body.updatedAt = now()
  db.configs[idx] = body
  writeDB(db)
  res.json({ ok: true })
})

app.post('/api/publish/:id', (req, res) => {
  const db = readDB()
  db.configs = db.configs || []
  const cfg = db.configs.find((c) => c.id === req.params.id)
  if (!cfg) {
    res.status(404).json({ message: '配置不存在' })
    return
  }
  cfg.status = 'published'
  cfg.publishedAt = now()
  cfg.updatedAt = now()
  writeDB(db)
  res.json({ url: `/h5/${cfg.id}?t=${Date.now()}` })
})

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: '未收到文件' })
    return
  }
  res.json({ url: `/uploads/${req.file.filename}` })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${PORT}`)
})

