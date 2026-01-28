'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore, selectIsAuthenticated } from '@/stores/authStore'
import { getUserSessions } from '@/lib/sessions'
import type { TuningSession } from '@/types'

export default function AccountPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const initialized = useAuthStore((state) => state.initialized)
  const { signOut, loading: authLoading } = useAuthStore()

  const [sessions, setSessions] = useState<TuningSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.push('/auth')
    }
  }, [initialized, isAuthenticated, router])

  // Fetch sessions
  useEffect(() => {
    if (user?.id) {
      setLoading(true)
      getUserSessions(user.id)
        .then(({ data, error }) => {
          if (error) {
            setError(error)
          } else if (data) {
            setSessions(data)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [user?.id])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // Get resonance label
  const getResonanceLabel = (value: number): string => {
    if (value >= 0.8) return 'Activated'
    if (value >= 0.6) return 'Flowing'
    if (value >= 0.4) return 'Awakening'
    if (value >= 0.2) return 'Emerging'
    return 'Ready'
  }

  // Format date
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (!initialized || !isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading...</div>
      </main>
    )
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="bg-mesh min-h-screen px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <Link
                href="/"
                className="font-ui text-sm text-text-muted hover:text-text-secondary transition-colors mb-4 inline-block"
              >
                &larr; Home
              </Link>
              <h1 className="font-display text-3xl sm:text-4xl text-text-primary mb-2">
                Your Account
              </h1>
              <p className="font-body text-text-muted">{user?.email}</p>
            </div>

            <button
              onClick={handleSignOut}
              disabled={authLoading}
              className="font-ui text-sm text-text-muted hover:text-red-400 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Sessions */}
          <div>
            <h2 className="font-display text-2xl text-text-primary mb-6">
              Your Activations
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-text-muted">Loading sessions...</div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400">{error}</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-12 bg-bg-surface/50 rounded-2xl border border-text-muted/10">
                <p className="font-body text-text-muted mb-4">
                  No activations yet. Start your first one!
                </p>
                <Link href="/tune" className="btn-primary">
                  Begin Activation
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-6 bg-bg-surface/50 rounded-xl border border-text-muted/10 hover:border-text-muted/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-ui text-xs text-text-muted mb-1">
                          {formatDate(session.createdAt)}
                        </p>
                        <p className="font-body text-text-secondary">
                          {session.selectedDomains.length} domain
                          {session.selectedDomains.length !== 1 ? 's' : ''} ·{' '}
                          {session.answers.length} question
                          {session.answers.length !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {session.results && (
                        <div className="text-right">
                          <p className="font-display text-2xl text-text-primary">
                            {Math.round(session.results.overallVibrancy * 100)}%
                          </p>
                          <p className="font-ui text-xs text-text-muted">
                            {getResonanceLabel(session.results.overallVibrancy)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Domain tags */}
                    <div className="flex flex-wrap gap-2">
                      {session.selectedDomains.map((domain) => (
                        <span
                          key={domain}
                          className="px-3 py-1 bg-bg-elevated rounded-full font-ui text-xs text-text-muted capitalize"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Start New */}
          {sessions.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/tune" className="btn-primary">
                Start New Activation
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
