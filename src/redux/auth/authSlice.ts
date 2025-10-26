import type { IUserAuth } from "@/types/user/user.type"
import { jwtDecode } from 'jwt-decode'
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IBusiness } from '@/components/shared/profile/Profile'


export type TRoleType = 'Administrator' | 'STAFF' | 'Manager' | 'Owner' | null

export const USER_ROLES = {
  ADMINISTRATOR: 'Administrator',
  STAFF: 'STAFF',
  MANAGER: 'Manager',
  BUSINESS_OWNER: 'Owner',
  UNIDENTIFIED: null
} as const


interface IAuthState {
    user: IUserAuth | null
    accessToken: string | null
    refreshToken: string | null
    roleId: string | null
    isOTP: boolean,
    isAuth: boolean
    role: TRoleType
    isLoginProcess?: boolean
    currentBusiness: string | null
    selectedBusiness: IBusiness | null
    businessProfiles: IBusiness[] | []
}

type TokenType = {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': TRoleType
    current_business: string
}

type UserPayload = Pick<IAuthState, 'accessToken' | 'refreshToken' | 'roleId' | 'isOTP' | 'isLoginProcess'>


const initialState: IAuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    roleId: null,
    isOTP: false,
    isAuth: false,
    role: null,
    isLoginProcess: false,
    currentBusiness: null,
    selectedBusiness: null,
    businessProfiles: []
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserPayload>) {
            const accessToken: TokenType = jwtDecode(action.payload.accessToken || '')

            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.roleId = action.payload.roleId
            state.role = accessToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            state.isOTP = action.payload.isOTP
            state.isLoginProcess = action.payload.isLoginProcess !== undefined ? action.payload.isLoginProcess : false
            state.currentBusiness = accessToken.current_business

            state.isAuth = true
            localStorage.setItem('accessToken', action.payload.accessToken ? action.payload.accessToken : '')
            localStorage.setItem('refreshToken', action.payload.refreshToken ? action.payload.refreshToken : '')
        },
        setSelectedBusinessProfile(state, action: PayloadAction<IBusiness>){
            state.selectedBusiness = action.payload
        },
        setBusinessProfiles(state, action: PayloadAction<IBusiness[]>){
            state.businessProfiles = action.payload
        },
        otpStepWasPassed(state){
            state.isOTP = false
        },
        logout(state) {
            const token = localStorage.getItem('accessToken')
            if(state.isAuth || token){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                return initialState
            }
        }
    }
})

export const { login, logout, otpStepWasPassed, setSelectedBusinessProfile, setBusinessProfiles } = userSlice.actions

export default userSlice.reducer