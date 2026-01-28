'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthForm } from '@/components/auth'
import { useAuthStore, selectIsAuthenticated } from '@/stores/authStore'

export default function AuthPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const initialized = useAuthStore((state) => state.initialized)

  // Redirect if already logged in
  useEffect(() => {
    if (initialized && isAuthenticated) {
      router.push('/')
    }
  }, [initialized, isAuthenticated, router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-cormorant text-4xl text-white/90 mb-2">
            Frequency Activator
          </h1>
          <p className="text-white/50 text-sm">
            Sign in to save your activations
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <AuthForm onSuccess={() => router.push('/')} />
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            ← Continue without signing in
          </button>
        </div>
      </div>
    </main>
  )
}
