"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/index"; // your typed Redux hook
import { setUser, clearUser } from "@/lib/reducers/userSlice";

export default function UserProfileSync() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser({ id: session.user.id, name: session.user.name, email: session.user.email }));
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

  return null; // This component just syncs state.
}
