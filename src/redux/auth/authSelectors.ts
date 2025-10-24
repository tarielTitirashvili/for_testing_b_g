import type { RootState } from '../store'

export const currentBusinessSelector = (state: RootState) => state.auth.currentBusiness
export const selectedBusinessProfileSelector = (state: RootState) => state.auth.selectedBusiness
export const BusinessProfilesSelector = (state: RootState) => state.auth.businessProfiles
