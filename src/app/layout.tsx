// src/app/layout.tsx
import ClientWrapper from '@/component/ClientWrapper'
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Notes Taker',
  description: 'Notes Taker with redux, nextjs, crud operation',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}
