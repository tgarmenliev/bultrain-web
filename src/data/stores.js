// The two stores, and which one to offer first: an Android phone gets Google Play, everyone else the App Store.
import { useSyncExternalStore } from 'react'

export const APP_STORE = 'https://apps.apple.com/bg/app/bultrain-train-schedules-bg/id6759790703'
export const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.bultrain.vlak_app_test'

const never = () => () => {}
const detect = () => (/android/i.test(navigator.userAgent) ? GOOGLE_PLAY : APP_STORE)
export const useStoreLink = () => useSyncExternalStore(never, detect, () => APP_STORE)
