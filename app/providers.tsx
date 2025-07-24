'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore, persistor } from '@/lib/store';
import { useRef } from 'react';

import '../lib/i18n';

export function Providers({ children, session }: { children: React.ReactNode; session: any }) {
  const storeRef = useRef(makeStore());
  const persistorRef = useRef(persistor(storeRef.current));

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  );
}
