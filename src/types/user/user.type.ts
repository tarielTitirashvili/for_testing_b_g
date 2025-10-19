export interface IUserAuth {
    email: string
    password: string
}

export interface IUserResponse {
    accessToken: string
    refreshToken: string
    roleId: string
}