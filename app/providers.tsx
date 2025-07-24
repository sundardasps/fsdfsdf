'use client'

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store/index'
import { useRef } from 'react'

import '../lib/i18n'

export function Providers({ children, session }: { children: React.ReactNode, session: any }) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </Provider>
  )
}
