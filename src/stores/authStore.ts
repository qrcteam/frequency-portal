import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import * as auth from '@/lib/auth'

interface AuthState {
  // State
  user: User | null
  session: Session | null
  loading: boolean
  initialized: boolean

  // Actions
  initialize: () => Promise<void>
  signUp: (email: string, password: string) => Promise<{ error: auth.AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: auth.AuthError | null }>
  signOut: () => Promise<{ error: auth.AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: auth.AuthError | null }>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    // Only initialize once
    if (get().initialized) return

    // Get initial session
    const { data: session } = await auth.getSession()

    set({
      session,
      user: session?.user ?? null,
      loading: false,
      initialized: true,
    })

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
      })
    })
  },

  signUp: async (email, password) => {
    set({ loading: true })
    const { error } = await auth.signUp(email, password)
    set({ loading: false })
    return { error }
  },

  signIn: async (email, password) => {
    set({ loading: true })
    const { data, error } = await auth.signIn(email, password)

    if (data) {
      set({
        user: data.user,
        session: data.session,
        loading: false,
      })
    } else {
      set({ loading: false })
    }

    return { error }
  },

  signOut: async () => {
    set({ loading: true })
    const { error } = await auth.signOut()

    if (!error) {
      set({
        user: null,
        session: null,
        loading: false,
      })
    } else {
      set({ loading: false })
    }

    return { error }
  },

  resetPassword: async (email) => {
    set({ loading: true })
    const { error } = await auth.resetPassword(email)
    set({ loading: false })
    return { error }
  },
}))

// Selectors
export const selectIsAuthenticated = (state: AuthState): boolean => {
  return !!state.user
}

export const selectUserEmail = (state: AuthState): string | null => {
  return state.user?.email ?? null
}
