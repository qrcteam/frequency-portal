'use client';

import { useTuningStore } from '@/stores/tuningStore';
import { NOTES, type Note } from '@/types';
import Link from 'next/link';
import { ShareButton } from '@/components/ui/ShareButton';

export default function ResultsPage() {
  const { currentSession, resetSession } = useTuningStore();

  // If no session, redirect to home
  if (!currentSession?.results) {
    return (
      <>
        <div className="grain" aria-hidden="true" />
        <main className="bg-mesh min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <div className="text-center">
            <h1 className="font-display text-3xl text-text-primary mb-4">
              No activation session found
            </h1>
            <p className="font-body text-text-muted mb-8">
              Start a new activation to see what&apos;s possible.
            </p>
            <Link href="/" className="btn-primary">
              Begin Activation
            </Link>
          </div>
        </main>
      </>
    );
  }

  const { results } = currentSession;

  // Get resonance label
  const getResonanceLabel = (value: number): string => {
    if (value >= 0.8) return 'Activated';
    if (value >= 0.6) return 'Flowing';
    if (value >= 0.4) return 'Awakening';
    if (value >= 0.2) return 'Emerging';
    return 'Ready';
  };

  // Get color intensity class based on value
  const getColorIntensity = (note: Note, value: number): string => {
    if (value >= 0.7) return `text-${note}-high`;
    if (value >= 0.4) return `text-${note}-mid`;
    return `text-${note}-low`;
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="bg-mesh min-h-screen px-6 py-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-up" style={{ animationFillMode: 'both' }}>
            <p className="font-ui text-xs tracking-[0.3em] uppercase text-text-secondary mb-6">
              Your Activation
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-text-primary leading-tight mb-4">
              Here&apos;s what&apos;s{' '}
              <span className="italic text-safety-high">possible</span>
            </h1>
            <p className="font-body text-lg text-text-muted max-w-lg mx-auto">
              This is a snapshot of your current frequency landscape.
              See what&apos;s ready to bloom and what&apos;s waiting to be awakened.
            </p>
          </div>

          {/* Overall Vibrancy */}
          <div
            className="text-center mb-16 fade-up delay-100"
            style={{ animationFillMode: 'both' }}
          >
            <div className="inline-block p-8 rounded-2xl bg-bg-surface/50 border border-text-muted/10">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-text-muted mb-3">
                Overall Vibrancy
              </p>
              <p className="font-display text-6xl font-light text-text-primary">
                {Math.round(results.overallVibrancy * 100)}
                <span className="text-2xl text-text-muted">%</span>
              </p>
              <p className="font-body text-text-secondary mt-2">
                {getResonanceLabel(results.overallVibrancy)}
              </p>
            </div>
          </div>

          {/* Note Breakdown */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16 fade-up delay-200"
            style={{ animationFillMode: 'both' }}
          >
            {NOTES.map((noteInfo) => {
              const noteResult = results.notes[noteInfo.id];
              const value = noteResult?.value ?? 0.5;
              const questionsAnswered = noteResult?.questionsAnswered ?? 0;

              return (
                <div
                  key={noteInfo.id}
                  className="p-6 rounded-xl bg-bg-surface/50 border border-text-muted/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: `var(--${noteInfo.id}-${value >= 0.7 ? 'high' : value >= 0.4 ? 'mid' : 'low'})`,
                      }}
                    />
                    <span className="font-ui text-xs tracking-wider uppercase text-text-muted">
                      {noteInfo.name}
                    </span>
                  </div>

                  <p
                    className="font-display text-3xl font-light mb-1"
                    style={{
                      color: `var(--${noteInfo.id}-${value >= 0.7 ? 'high' : value >= 0.4 ? 'mid' : 'low'})`,
                    }}
                  >
                    {Math.round(value * 100)}%
                  </p>

                  <p className="font-body text-sm text-text-muted">
                    {getResonanceLabel(value)}
                  </p>

                  {questionsAnswered > 0 && (
                    <p className="font-ui text-xs text-text-muted/60 mt-2">
                      {questionsAnswered} question{questionsAnswered !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Invitation */}
          <div
            className="text-center mb-12 fade-up delay-300"
            style={{ animationFillMode: 'both' }}
          >
            <p className="font-body text-lg text-text-secondary italic max-w-lg mx-auto">
              &ldquo;Every frequency is already within you. Activation is simply
              remembering how to play them.&rdquo;
            </p>
          </div>

          {/* Actions */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up delay-400"
            style={{ animationFillMode: 'both' }}
          >
            <Link href="/tune" className="btn-primary" onClick={resetSession}>
              Activate Again
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </Link>

            <ShareButton
              title="Frequency Activator | Quantum Reality Creators"
              text="I just discovered my frequency across six notes of creation. Try it yourself!"
              className="text-text-muted hover:text-text-secondary"
            />

            <Link
              href="/"
              className="font-ui text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
