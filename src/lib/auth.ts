import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export type AuthError = {
  message: string
  status?: number
}

export type AuthResult<T> = {
  data: T | null
  error: AuthError | null
}

// Sign up with email and password
export async function signUp(
  email: string,
  password: string
): Promise<AuthResult<{ user: User; session: Session }>> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  if (!data.user || !data.session) {
    return { data: null, error: { message: 'Sign up successful. Please check your email to confirm.' } }
  }

  return { data: { user: data.user, session: data.session }, error: null }
}

// Sign in with email and password
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult<{ user: User; session: Session }>> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  return { data: { user: data.user, session: data.session }, error: null }
}

// Sign out
export async function signOut(): Promise<AuthResult<null>> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  return { data: null, error: null }
}

// Get current session
export async function getSession(): Promise<AuthResult<Session>> {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  return { data: data.session, error: null }
}

// Get current user
export async function getUser(): Promise<AuthResult<User>> {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  return { data: data.user, error: null }
}

// Reset password (sends email)
export async function resetPassword(email: string): Promise<AuthResult<null>> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  return { data: null, error: null }
}

// Update password (after reset)
export async function updatePassword(newPassword: string): Promise<AuthResult<User>> {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { data: null, error: { message: error.message, status: error.status } }
  }

  return { data: data.user, error: null }
}
