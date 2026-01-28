'use client';

import { useState, useEffect } from 'react';
import { useTuningStore, selectIsLastQuestion, selectIsFirstQuestion } from '@/stores/tuningStore';
import { useAuthStore } from '@/stores/authStore';
import type { Question, Note } from '@/types';
import { useRouter } from 'next/navigation';
import { getNoteInvitation } from '@/lib/questions';

interface QuestionCardProps {
  question: Question;
}

// Note color mapping for styling
const noteColors: Record<Note, { bg: string; text: string; border: string }> = {
  safety: {
    bg: 'bg-safety-dim/30',
    text: 'text-safety-high',
    border: 'border-safety-mid/50',
  },
  pleasure: {
    bg: 'bg-pleasure-dim/30',
    text: 'text-pleasure-high',
    border: 'border-pleasure-mid/50',
  },
  power: {
    bg: 'bg-power-dim/30',
    text: 'text-power-high',
    border: 'border-power-mid/50',
  },
  light: {
    bg: 'bg-light-dim/30',
    text: 'text-light-high',
    border: 'border-light-mid/50',
  },
  now: {
    bg: 'bg-now-dim/30',
    text: 'text-now-high',
    border: 'border-now-mid/50',
  },
  heat: {
    bg: 'bg-heat-dim/30',
    text: 'text-heat-high',
    border: 'border-heat-mid/50',
  },
};

export function QuestionCard({ question }: QuestionCardProps) {
  const router = useRouter();
  const {
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getAnswerForQuestion,
    completeSession,
    currentSession,
    sessionQuestions,
  } = useTuningStore();

  const isLast = useTuningStore(selectIsLastQuestion);
  const isFirst = useTuningStore(selectIsFirstQuestion);
  const user = useAuthStore((state) => state.user);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  const existingAnswer = getAnswerForQuestion(question.id);
  const colors = noteColors[question.note];

  // Initialize with existing answer if any
  useEffect(() => {
    setSelectedOptionId(existingAnswer?.optionId ?? null);
    setIsEntering(true);
    const timer = setTimeout(() => setIsEntering(false), 500);
    return () => clearTimeout(timer);
  }, [question.id, existingAnswer]);

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    answerQuestion(question.id, optionId);
  };

  const handleContinue = () => {
    if (!selectedOptionId) return;

    setIsExiting(true);

    setTimeout(() => {
      if (isLast) {
        // Calculate results and complete session
        const results = calculateResults();
        completeSession(results, user?.id);
        router.push('/results');
      } else {
        nextQuestion();
        setIsExiting(false);
      }
    }, 400);
  };

  const handleBack = () => {
    if (isFirst) return;

    setIsExiting(true);

    setTimeout(() => {
      previousQuestion();
      setIsExiting(false);
    }, 400);
  };

  // Simple results calculation (can be expanded later)
  const calculateResults = () => {
    if (!currentSession) {
      return {
        notes: {} as any,
        domains: {},
        overallVibrancy: 0.5,
        timestamp: Date.now(),
      };
    }

    const noteScores: Record<Note, { total: number; count: number }> = {
      safety: { total: 0, count: 0 },
      pleasure: { total: 0, count: 0 },
      power: { total: 0, count: 0 },
      light: { total: 0, count: 0 },
      now: { total: 0, count: 0 },
      heat: { total: 0, count: 0 },
    };

    const resonanceValues: Record<string, number> = {
      high: 1.0,
      'mid-high': 0.75,
      mid: 0.5,
      'mid-low': 0.25,
      low: 0.0,
    };

    currentSession.answers.forEach((answer) => {
      const q = sessionQuestions.find((sq) => sq.id === answer.questionId);
      if (!q) return;

      const option = q.options.find((o) => o.id === answer.optionId);
      if (!option) return;

      noteScores[q.note].total += resonanceValues[option.resonance] ?? 0.5;
      noteScores[q.note].count += 1;
    });

    const notes: Record<Note, { value: number; questionsAnswered: number }> = {} as any;
    let totalVibrancy = 0;
    let noteCount = 0;

    (Object.keys(noteScores) as Note[]).forEach((note) => {
      const { total, count } = noteScores[note];
      const value = count > 0 ? total / count : 0.5;
      notes[note] = {
        value,
        questionsAnswered: count,
      };
      if (count > 0) {
        totalVibrancy += value;
        noteCount += 1;
      }
    });

    return {
      notes,
      domains: {},
      overallVibrancy: noteCount > 0 ? totalVibrancy / noteCount : 0.5,
      timestamp: Date.now(),
    };
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto transition-all duration-500 ${
        isExiting
          ? 'opacity-0 -translate-y-4'
          : isEntering
          ? 'opacity-0 translate-y-4'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Note indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span
          className={`font-ui text-xs tracking-[0.2em] uppercase ${colors.text}`}
        >
          {question.note}
        </span>
        {question.domain && (
          <>
            <span className="text-text-muted">·</span>
            <span className="font-ui text-xs tracking-[0.2em] uppercase text-text-muted">
              {question.domain}
            </span>
          </>
        )}
      </div>

      {/* Question text */}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text-primary text-center leading-relaxed mb-4">
        {question.text}
      </h2>

      {/* Subtext / invitation */}
      {question.subtext && (
        <p className="font-body text-base text-text-muted text-center mb-8 italic">
          {question.subtext}
        </p>
      )}

      {/* Options */}
      <div className="space-y-3 mt-10">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              className={`w-full p-5 rounded-xl border text-left transition-all duration-300 group ${
                isSelected
                  ? `${colors.bg} ${colors.border} border-2`
                  : 'bg-bg-surface/50 border-transparent hover:bg-bg-surface hover:border-text-muted/20'
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Selection indicator */}
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? `${colors.border} ${colors.bg}`
                      : 'border-text-muted/40'
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`}
                    />
                  )}
                </div>

                {/* Option text */}
                <span
                  className={`font-body text-base sm:text-lg leading-relaxed transition-colors ${
                    isSelected ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Soft reminder */}
      <p className="font-body text-sm text-text-muted text-center mt-8 italic opacity-60">
        Notice what emerges. Trust what you feel.
      </p>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={isFirst}
          className={`font-ui text-sm transition-colors ${
            isFirst
              ? 'text-text-muted/30 cursor-not-allowed'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          &larr; Previous
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedOptionId}
          className={`btn-primary transition-all duration-300 ${
            !selectedOptionId ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          {isLast ? 'See Results' : 'Continue'}
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
