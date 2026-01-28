import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Domain,
  Answer,
  TuningSession,
  TuningResults,
  TuningPhase,
  Question,
} from '@/types';
import { saveSession } from '@/lib/sessions';

interface TuningState {
  // Current session
  currentSession: TuningSession | null;

  // Navigation
  phase: TuningPhase;
  currentQuestionIndex: number;

  // Questions for current session (filtered by selected domains)
  sessionQuestions: Question[];

  // Actions
  setPhase: (phase: TuningPhase) => void;
  startSession: (domains: Domain[]) => void;
  setSessionQuestions: (questions: Question[]) => void;
  answerQuestion: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeSession: (results: TuningResults, userId?: string) => void;
  resetSession: () => void;

  // Get current answer for a question (for showing selected state)
  getAnswerForQuestion: (questionId: string) => Answer | undefined;

  // History (persisted for free tier)
  sessionHistory: TuningSession[];
  addToHistory: (session: TuningSession) => void;
  clearHistory: () => void;
}

export const useTuningStore = create<TuningState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSession: null,
      phase: 'welcome',
      currentQuestionIndex: 0,
      sessionQuestions: [],
      sessionHistory: [],

      setPhase: (phase) => {
        set({ phase });
      },

      startSession: (domains) => {
        const session: TuningSession = {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          selectedDomains: domains,
          answers: [],
          completed: false,
        };

        set({
          currentSession: session,
          currentQuestionIndex: 0,
          phase: 'tuning',
        });
      },

      setSessionQuestions: (questions) => {
        set({ sessionQuestions: questions });
      },

      answerQuestion: (questionId, optionId) => {
        const session = get().currentSession;
        if (!session) return;

        const newAnswer: Answer = {
          questionId,
          optionId,
          timestamp: Date.now(),
        };

        // Check if we already have an answer for this question
        const existingIndex = session.answers.findIndex(
          (a) => a.questionId === questionId
        );

        let newAnswers: Answer[];
        if (existingIndex >= 0) {
          // Update existing answer
          newAnswers = session.answers.map((a, i) =>
            i === existingIndex ? newAnswer : a
          );
        } else {
          // Add new answer
          newAnswers = [...session.answers, newAnswer];
        }

        set({
          currentSession: {
            ...session,
            answers: newAnswers,
          },
        });
      },

      nextQuestion: () => {
        const { currentQuestionIndex, sessionQuestions } = get();
        if (currentQuestionIndex < sessionQuestions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      completeSession: (results, userId) => {
        const session = get().currentSession;
        if (!session) return;

        const completedSession: TuningSession = {
          ...session,
          userId,
          results,
          completed: true,
        };

        set({
          currentSession: completedSession,
          phase: 'results',
        });

        // Add to local history
        get().addToHistory(completedSession);

        // Save to Supabase if user is logged in
        if (userId) {
          saveSession(completedSession, userId).catch((err) => {
            console.error('Failed to save session to Supabase:', err);
          });
        }
      },

      resetSession: () => {
        set({
          currentSession: null,
          phase: 'welcome',
          currentQuestionIndex: 0,
          sessionQuestions: [],
        });
      },

      getAnswerForQuestion: (questionId) => {
        const session = get().currentSession;
        if (!session) return undefined;
        return session.answers.find((a) => a.questionId === questionId);
      },

      addToHistory: (session) => {
        set((state) => ({
          sessionHistory: [session, ...state.sessionHistory].slice(0, 50), // Keep last 50
        }));
      },

      clearHistory: () => {
        set({ sessionHistory: [] });
      },
    }),
    {
      name: 'frequency-tuning-storage',
      // Only persist session history, not current session state
      partialize: (state) => ({
        sessionHistory: state.sessionHistory,
      }),
    }
  )
);

// Selectors for common derived state
export const selectCurrentQuestion = (state: TuningState): Question | null => {
  const { sessionQuestions, currentQuestionIndex } = state;
  return sessionQuestions[currentQuestionIndex] ?? null;
};

export const selectProgress = (state: TuningState): { current: number; total: number } => {
  return {
    current: state.currentQuestionIndex + 1,
    total: state.sessionQuestions.length,
  };
};

export const selectIsLastQuestion = (state: TuningState): boolean => {
  return state.currentQuestionIndex >= state.sessionQuestions.length - 1;
};

export const selectIsFirstQuestion = (state: TuningState): boolean => {
  return state.currentQuestionIndex === 0;
};

export const selectHasAnsweredCurrent = (state: TuningState): boolean => {
  const currentQuestion = selectCurrentQuestion(state);
  if (!currentQuestion || !state.currentSession) return false;
  return state.currentSession.answers.some(
    (a) => a.questionId === currentQuestion.id
  );
};
