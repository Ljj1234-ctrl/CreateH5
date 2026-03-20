export type TemplateKey = 'signup' | 'vote' | 'lottery' | 'download' | 'coupon' | 'generic'

export type ActivityStatus = 'draft' | 'published'

export type ButtonConfig = {
  text: string
  link: string
}

export type HeroConfig = {
  title: string
  subTitle?: string
  coverUrl?: string
}

export type FormFieldType = 'text' | 'phone' | 'email'

export type FormField = {
  key: string
  label: string
  type: FormFieldType
  required?: boolean
  placeholder?: string
}

export type SignupConfig = {
  fields: FormField[]
  submitText: string
  successToast: string
}

export type VoteOption = { id: string; label: string; imageUrl?: string; count?: number }
export type VoteConfig = {
  title: string
  options: VoteOption[]
  perUserLimit: number
  buttonText: string
}

export type LotteryPrize = { id: string; name: string; weight: number }
export type LotteryConfig = {
  title: string
  prizes: LotteryPrize[]
  buttonText: string
  tipText: string
}

export type DownloadConfig = {
  title: string
  desc: string
  downloadUrl: string
  buttonText: string
}

export type CouponConfig = {
  title: string
  desc: string
  code: string
  buttonText: string
}

export type GenericConfig = {
  paragraphs: string[]
  primaryButton: ButtonConfig
}

export type ActivityConfig = {
  id: string
  name: string
  template: TemplateKey
  status: ActivityStatus
  updatedAt: number
  publishedAt?: number
  hero: HeroConfig
  cta: ButtonConfig
  signup?: SignupConfig
  vote?: VoteConfig
  lottery?: LotteryConfig
  download?: DownloadConfig
  coupon?: CouponConfig
  generic?: GenericConfig
}

export type ActivityListItem = Pick<
  ActivityConfig,
  'id' | 'name' | 'template' | 'status' | 'updatedAt' | 'publishedAt'
>

