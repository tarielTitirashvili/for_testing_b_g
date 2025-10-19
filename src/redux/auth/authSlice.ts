import type { IUserAuth } from "@/types/user/user.type"
import { jwtDecode } from 'jwt-decode'
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


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
    currentBusiness: null
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
        otpStepWasPassed(state){
            state.isOTP = false
        },
        logout(state) {
            const token = localStorage.getItem('accessToken')
            if(state.isAuth || token){
                state.user = null
                state.accessToken = null
                state.refreshToken = null
                state.roleId = null
                state.isAuth = false;
                state.isOTP = false;
                state.role = null
    
                state.isAuth = false
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }
    }
})

export const { login, logout, otpStepWasPassed } = userSlice.actions

export default userSlice.reducer