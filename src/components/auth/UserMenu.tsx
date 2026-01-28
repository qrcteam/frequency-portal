'use client'

import Link from 'next/link'
import { useAuthStore, selectIsAuthenticated } from '@/stores/authStore'

export function UserMenu() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const initialized = useAuthStore((state) => state.initialized)

  // Don't render anything until auth is initialized to avoid flash
  if (!initialized) {
    return <div className="w-16" /> // Placeholder for layout stability
  }

  if (isAuthenticated) {
    return (
      <Link
        href="/account"
        className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        Account
      </Link>
    )
  }

  return (
    <Link
      href="/auth"
      className="font-ui text-sm text-text-secondary hover:text-text-primary transition-colors"
    >
      Sign In
    </Link>
  )
}
