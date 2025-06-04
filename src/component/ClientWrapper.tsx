// src/app/ClientWrapper.tsx
'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Header from '@/component/Header'
import { AuthInit } from '@/component/AuthInit'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInit />
      <Header />
      {children}
    </Provider>
  )
}
