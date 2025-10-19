// src/redux/storeAccessor.ts
import type { AppDispatch } from './store'

let appDispatch: AppDispatch

export const setDispatch = (dispatch: AppDispatch) => {
  appDispatch = dispatch
}

export const getDispatch = () => appDispatch
