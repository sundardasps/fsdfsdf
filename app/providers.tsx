"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, persistor, store } from "@/lib/store";
import { useRef } from "react";

import "../lib/i18n";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  // Optional: you can memoize the store and persistor in refs if you want (though often can just use directly)
  const storeRef = useRef(store); // store is already created instance
  const persistorRef = useRef(persistor); // persistor is already created instance

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  );
}
