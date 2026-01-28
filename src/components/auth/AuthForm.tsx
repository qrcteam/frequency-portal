'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

type AuthMode = 'sign-in' | 'sign-up' | 'reset'

interface AuthFormProps {
  onSuccess?: () => void
  defaultMode?: AuthMode
}

export function AuthForm({ onSuccess, defaultMode = 'sign-in' }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const { signIn, signUp, resetPassword, loading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (mode === 'sign-in') {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        onSuccess?.()
      }
    } else if (mode === 'sign-up') {
      const { error } = await signUp(email, password)
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email to confirm your account.')
      }
    } else if (mode === 'reset') {
      const { error } = await resetPassword(email)
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for a password reset link.')
      }
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-light text-center text-white/90">
          {mode === 'sign-in' && 'Welcome Back'}
          {mode === 'sign-up' && 'Create Account'}
          {mode === 'reset' && 'Reset Password'}
        </h2>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-200 text-sm">
            {message}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
          />

          {mode !== 'reset' && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="inline-block animate-pulse">...</span>
          ) : (
            <>
              {mode === 'sign-in' && 'Sign In'}
              {mode === 'sign-up' && 'Create Account'}
              {mode === 'reset' && 'Send Reset Link'}
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-white/50 space-y-2">
        {mode === 'sign-in' && (
          <>
            <button
              onClick={() => setMode('sign-up')}
              className="hover:text-white/70 transition-colors"
            >
              Need an account? Sign up
            </button>
            <br />
            <button
              onClick={() => setMode('reset')}
              className="hover:text-white/70 transition-colors"
            >
              Forgot password?
            </button>
          </>
        )}

        {mode === 'sign-up' && (
          <button
            onClick={() => setMode('sign-in')}
            className="hover:text-white/70 transition-colors"
          >
            Already have an account? Sign in
          </button>
        )}

        {mode === 'reset' && (
          <button
            onClick={() => setMode('sign-in')}
            className="hover:text-white/70 transition-colors"
          >
            Back to sign in
          </button>
        )}
      </div>
    </div>
  )
}
