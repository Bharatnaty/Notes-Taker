"use client"

import './globals.css'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Header from '@/component/Header'
import { AuthInit } from '@/component/AuthInit'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthInit/>
          <Header/>
          {children}</Provider>
      </body>
    </html>
  )
}
