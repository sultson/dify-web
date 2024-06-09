import type { AppInfo } from '@/types/app'

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const CLIENT = `${process.env.NEXT_PUBLIC_CLIENT}`
export const APP_ID = `${process.env[`NEXT_PUBLIC_APP_${CLIENT}_ID`]}`
export const API_KEY = `${process.env[`NEXT_PUBLIC_APP_${CLIENT}_KEY`]}`

export const IS_WORKFLOW = `${process.env.NEXT_PUBLIC_APP_TYPE_WORKFLOW}` === 'true'
export const APP_INFO: AppInfo = {
  title: `${CLIENT === 'PMO' ? 'Content' : 'Productbeschrijving'} Generator`,
  description: `Agentics x ${CLIENT === 'PMO' ? 'PMO' : 'OutdoorXL'}`,
  copyright: 'Agentics',
  privacy_policy: '',
  default_language: 'en',
}

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
