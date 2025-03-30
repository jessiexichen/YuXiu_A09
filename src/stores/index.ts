import { createPinia } from 'pinia'
import { useAvatarStore } from './avatar'
import { useCollectionStore } from './collection'
import { useLoginStore } from './login'

export const pinia = createPinia()

export const useAvatar = useAvatarStore
export const useCollection = useCollectionStore
export const useLogin = useLoginStore
