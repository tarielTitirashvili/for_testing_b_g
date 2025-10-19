import type { RootState } from '../store'

export const currentBusinessSelector = (state: RootState) => state.auth.currentBusiness
