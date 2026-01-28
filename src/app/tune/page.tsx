'use client';

import { useState, useEffect } from 'react';
import { useTuningStore } from '@/stores/tuningStore';
import { DOMAINS, type Domain } from '@/types';
import { getQuestionsForDomains, shuffleQuestionsWithinNotes } from '@/lib/questions';
import { QuestionCard } from '@/components/tuning/QuestionCard';
import Link from 'next/link';

export default function TunePage() {
  const {
    phase,
    setPhase,
    startSession,
    setSessionQuestions,
    currentSession,
    sessionQuestions,
    currentQuestionIndex,
    resetSession,
  } = useTuningStore();

  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset session when landing on this page fresh
  useEffect(() => {
    if (phase === 'results') {
      resetSession();
    }
  }, []);

  const toggleDomain = (domain: Domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const selectAllDomains = () => {
    setSelectedDomains(DOMAINS.map((d) => d.id));
  };

  const handleBeginTuning = () => {
    if (selectedDomains.length === 0) return;

    setIsTransitioning(true);

    // Small delay for transition
    setTimeout(() => {
      // Get and shuffle questions for selected domains
      const questions = shuffleQuestionsWithinNotes(
        getQuestionsForDomains(selectedDomains)
      );

      // Start session and set questions
      startSession(selectedDomains);
      setSessionQuestions(questions);
      setIsTransitioning(false);
    }, 500);
  };

  // Domain Selection Phase
  if (phase !== 'tuning' || !currentSession) {
    return (
      <>
        <div className="grain" aria-hidden="true" />

        <main className="bg-mesh min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
          {/* Back link */}
          <Link
            href="/"
            className="absolute top-8 left-8 font-ui text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            &larr; Back
          </Link>

          <div
            className={`relative z-10 max-w-3xl mx-auto text-center transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Header */}
            <p
              className="font-ui text-xs tracking-[0.3em] uppercase text-text-secondary mb-6 fade-up"
              style={{ animationFillMode: 'both' }}
            >
              Choose Your Activation
            </p>

            <h1
              className="font-display text-4xl sm:text-5xl font-light text-text-primary leading-tight mb-4 fade-up delay-100"
              style={{ animationFillMode: 'both' }}
            >
              What would you like to{' '}
              <span className="italic text-light-high">activate</span> today?
            </h1>

            <p
              className="font-body text-lg text-text-muted mb-12 max-w-xl mx-auto fade-up delay-200"
              style={{ animationFillMode: 'both' }}
            >
              Select one or more life domains. The more you choose, the deeper
              your activation.
            </p>

            {/* Domain Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 fade-up delay-300"
              style={{ animationFillMode: 'both' }}
            >
              {DOMAINS.map((domain) => {
                const isSelected = selectedDomains.includes(domain.id);
                return (
                  <button
                    key={domain.id}
                    onClick={() => toggleDomain(domain.id)}
                    className={`group relative p-6 rounded-xl border text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-bg-elevated border-text-secondary'
                        : 'bg-bg-surface/50 border-transparent hover:bg-bg-surface hover:border-text-muted/30'
                    }`}
                  >
                    {/* Selection indicator */}
                    <div
                      className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'border-light-high bg-light-high'
                          : 'border-text-muted/40'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-bg-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    <h3
                      className={`font-display text-xl mb-2 transition-colors ${
                        isSelected ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {domain.name}
                    </h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed">
                      {domain.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Select All */}
            <button
              onClick={selectAllDomains}
              className="font-ui text-sm text-text-muted hover:text-text-secondary transition-colors mb-8 fade-up delay-400"
              style={{ animationFillMode: 'both' }}
            >
              Select all domains for a complete activation
            </button>

            {/* Begin Button */}
            <div
              className="fade-up delay-500"
              style={{ animationFillMode: 'both' }}
            >
              <button
                onClick={handleBeginTuning}
                disabled={selectedDomains.length === 0}
                className={`btn-primary text-lg px-10 py-4 transition-all duration-300 ${
                  selectedDomains.length === 0
                    ? 'opacity-40 cursor-not-allowed'
                    : ''
                }`}
              >
                Begin Activation
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              {selectedDomains.length > 0 && (
                <p className="font-body text-sm text-text-muted mt-4">
                  {selectedDomains.length === 1
                    ? '1 domain selected'
                    : `${selectedDomains.length} domains selected`}
                  {' · '}
                  {getQuestionsForDomains(selectedDomains).length} questions
                </p>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }

  // Tuning Phase - Show Questions
  const currentQuestion = sessionQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="bg-mesh min-h-screen flex flex-col relative overflow-hidden">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-bg-secondary">
          <div
            className="h-full bg-gradient-to-r from-safety-mid to-light-mid transition-all duration-500 ease-out"
            style={{
              width: `${((currentQuestionIndex + 1) / sessionQuestions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question counter */}
        <div className="absolute top-6 right-6 font-ui text-sm text-text-muted">
          {currentQuestionIndex + 1} / {sessionQuestions.length}
        </div>

        {/* Back link */}
        <button
          onClick={resetSession}
          className="absolute top-6 left-6 font-ui text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          &larr; Exit
        </button>

        {/* Question Card */}
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <QuestionCard question={currentQuestion} />
        </div>
      </main>
    </>
  );
}
