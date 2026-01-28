# Technical Specification

## Technology Stack

### Core
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion
- **State Management:** Zustand (lightweight, perfect for this scope)

### Storage
- **Free Tier:** localStorage (no backend required)
- **Paid Tier:** Supabase (Auth + Postgres)

### Deployment
- **Platform:** Vercel
- **Domain:** To be configured

### Optional Enhancements
- **Visualization:** Canvas/WebGL for particle systems (if Option 5)
- **Audio:** Tone.js (if adding sound feedback)

---

## Project Structure

```
frequency-tuning-portal/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles + Tailwind
│   │
│   ├── tune/
│   │   ├── page.tsx            # Main tuning experience
│   │   └── layout.tsx          # Tuning-specific layout
│   │
│   ├── results/
│   │   ├── page.tsx            # Results display
│   │   └── layout.tsx          # Results layout
│   │
│   └── api/
│       └── sessions/
│           └── route.ts        # Session CRUD (paid tier)
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Transition.tsx
│   │   └── ...
│   │
│   ├── tuning/
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── DomainSelector.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── InvitationText.tsx
│   │   └── TuningFlow.tsx      # Main orchestrator
│   │
│   ├── visualizations/
│   │   ├── FrequencyChord.tsx  # Hexagon visualization
│   │   ├── WaveformDisplay.tsx
│   │   ├── GradientOrb.tsx
│   │   ├── FlowerMandala.tsx
│   │   ├── ParticleField.tsx
│   │   └── VisualizationSwitch.tsx
│   │
│   ├── results/
│   │   ├── ResultsOverview.tsx
│   │   ├── NoteBreakdown.tsx
│   │   ├── DomainDetail.tsx
│   │   ├── GuidanceCard.tsx
│   │   └── PaywallPrompt.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── BackgroundMesh.tsx
│
├── lib/
│   ├── questions.ts            # Question data
│   ├── scoring.ts              # Resonance calculations
│   ├── guidance.ts             # Guidance selection logic
│   ├── colors.ts               # Color utilities
│   ├── storage.ts              # localStorage helpers
│   └── supabase.ts             # Supabase client (paid)
│
├── stores/
│   └── tuningStore.ts          # Zustand store
│
├── types/
│   └── index.ts                # TypeScript definitions
│
├── hooks/
│   ├── useTuning.ts            # Tuning state hook
│   ├── useVisualization.ts     # Viz state hook
│   └── useLocalStorage.ts      # Storage hook
│
├── public/
│   ├── fonts/                  # Custom fonts
│   └── images/                 # Static assets
│
├── CLAUDE.md                   # Claude Code instructions
├── PROJECT_OVERVIEW.md
├── CONTENT_SPEC.md
├── VISUAL_DESIGN.md
└── TECHNICAL_SPEC.md           # This file
```

---

## Type Definitions

```typescript
// types/index.ts

// Core types
export type Note = 'safety' | 'pleasure' | 'power' | 'light' | 'now' | 'heat';
export type Triad = 'feminine' | 'masculine';
export type Domain = 'spirit' | 'body' | 'self' | 'relationships' | 'wealth' | 'purpose' | 'play';
export type ResonanceLevel = 'high' | 'mid-high' | 'mid' | 'mid-low' | 'low';
export type TensionType = 'tight' | 'balanced' | 'loose';

// Question structure
export interface AnswerOption {
  id: string;
  text: string;
  resonance: ResonanceLevel;
  tension?: TensionType;
}

export interface Question {
  id: string;
  note: Note;
  domain?: Domain;
  text: string;
  subtext?: string;
  options: AnswerOption[];
}

// User responses
export interface Answer {
  questionId: string;
  optionId: string;
  timestamp: number;
}

// Results
export interface NoteResonance {
  value: number;        // 0-1 scale
  tension?: TensionType;
  questionsAnswered: number;
}

export interface DomainResonance {
  notes: Partial<Record<Note, NoteResonance>>;
  overallVibrancy: number;
}

export interface TuningResults {
  notes: Record<Note, NoteResonance>;
  domains: Partial<Record<Domain, DomainResonance>>;
  overallVibrancy: number;
  timestamp: number;
}

// Session
export interface TuningSession {
  id: string;
  userId?: string;
  createdAt: number;
  selectedDomains: Domain[];
  answers: Answer[];
  results?: TuningResults;
  completed: boolean;
}

// Guidance
export interface GuidanceItem {
  note: Note;
  domain?: Domain;
  reflection: string;
  invitation: string;
  practices: string[];
}

// Visualization
export type VisualizationType = 'chord' | 'waveform' | 'orb' | 'flower' | 'particles';

export interface VisualizationProps {
  results: TuningResults;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

---

## State Management (Zustand)

```typescript
// stores/tuningStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TuningState {
  // Current session
  currentSession: TuningSession | null;
  
  // Navigation
  currentQuestionIndex: number;
  
  // Actions
  startSession: (domains: Domain[]) => void;
  answerQuestion: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeSession: () => void;
  resetSession: () => void;
  
  // History (for paid tier)
  sessionHistory: TuningSession[];
  addToHistory: (session: TuningSession) => void;
}

export const useTuningStore = create<TuningState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      currentQuestionIndex: 0,
      sessionHistory: [],
      
      startSession: (domains) => {
        set({
          currentSession: {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            selectedDomains: domains,
            answers: [],
            completed: false,
          },
          currentQuestionIndex: 0,
        });
      },
      
      answerQuestion: (questionId, optionId) => {
        const session = get().currentSession;
        if (!session) return;
        
        const existingIndex = session.answers.findIndex(
          a => a.questionId === questionId
        );
        
        const newAnswer: Answer = {
          questionId,
          optionId,
          timestamp: Date.now(),
        };
        
        const newAnswers = existingIndex >= 0
          ? session.answers.map((a, i) => i === existingIndex ? newAnswer : a)
          : [...session.answers, newAnswer];
        
        set({
          currentSession: {
            ...session,
            answers: newAnswers,
          },
        });
      },
      
      nextQuestion: () => {
        set(state => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        }));
      },
      
      previousQuestion: () => {
        set(state => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        }));
      },
      
      completeSession: () => {
        const session = get().currentSession;
        if (!session) return;
        
        const results = calculateResults(session);
        const completedSession = {
          ...session,
          results,
          completed: true,
        };
        
        set({
          currentSession: completedSession,
        });
        
        get().addToHistory(completedSession);
      },
      
      resetSession: () => {
        set({
          currentSession: null,
          currentQuestionIndex: 0,
        });
      },
      
      addToHistory: (session) => {
        set(state => ({
          sessionHistory: [session, ...state.sessionHistory].slice(0, 50),
        }));
      },
    }),
    {
      name: 'frequency-tuning-storage',
      partialize: (state) => ({
        sessionHistory: state.sessionHistory,
      }),
    }
  )
);
```

---

## Scoring Logic

```typescript
// lib/scoring.ts

const RESONANCE_VALUES: Record<ResonanceLevel, number> = {
  'high': 1.0,
  'mid-high': 0.75,
  'mid': 0.5,
  'mid-low': 0.25,
  'low': 0.0,
};

export function calculateResults(session: TuningSession): TuningResults {
  const questions = getQuestionsForSession(session);
  
  // Initialize accumulators
  const noteAccumulator: Record<Note, { total: number; count: number; tensions: TensionType[] }> = {
    safety: { total: 0, count: 0, tensions: [] },
    pleasure: { total: 0, count: 0, tensions: [] },
    power: { total: 0, count: 0, tensions: [] },
    light: { total: 0, count: 0, tensions: [] },
    now: { total: 0, count: 0, tensions: [] },
    heat: { total: 0, count: 0, tensions: [] },
  };
  
  const domainAccumulator: Partial<Record<Domain, Record<Note, { total: number; count: number }>>> = {};
  
  // Process each answer
  session.answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.id === answer.optionId);
    if (!option) return;
    
    const value = RESONANCE_VALUES[option.resonance];
    
    // Add to note accumulator
    noteAccumulator[question.note].total += value;
    noteAccumulator[question.note].count += 1;
    if (option.tension) {
      noteAccumulator[question.note].tensions.push(option.tension);
    }
    
    // Add to domain accumulator if applicable
    if (question.domain) {
      if (!domainAccumulator[question.domain]) {
        domainAccumulator[question.domain] = {} as Record<Note, { total: number; count: number }>;
      }
      if (!domainAccumulator[question.domain]![question.note]) {
        domainAccumulator[question.domain]![question.note] = { total: 0, count: 0 };
      }
      domainAccumulator[question.domain]![question.note].total += value;
      domainAccumulator[question.domain]![question.note].count += 1;
    }
  });
  
  // Calculate note resonances
  const notes: Record<Note, NoteResonance> = {} as Record<Note, NoteResonance>;
  (Object.keys(noteAccumulator) as Note[]).forEach(note => {
    const acc = noteAccumulator[note];
    notes[note] = {
      value: acc.count > 0 ? acc.total / acc.count : 0.5,
      tension: calculatePredominantTension(acc.tensions),
      questionsAnswered: acc.count,
    };
  });
  
  // Calculate domain resonances
  const domains: Partial<Record<Domain, DomainResonance>> = {};
  (Object.keys(domainAccumulator) as Domain[]).forEach(domain => {
    const domainNotes: Partial<Record<Note, NoteResonance>> = {};
    let domainTotal = 0;
    let domainCount = 0;
    
    (Object.keys(domainAccumulator[domain]!) as Note[]).forEach(note => {
      const acc = domainAccumulator[domain]![note];
      const value = acc.count > 0 ? acc.total / acc.count : 0.5;
      domainNotes[note] = {
        value,
        questionsAnswered: acc.count,
      };
      domainTotal += value;
      domainCount += 1;
    });
    
    domains[domain] = {
      notes: domainNotes,
      overallVibrancy: domainCount > 0 ? domainTotal / domainCount : 0.5,
    };
  });
  
  // Calculate overall vibrancy
  const overallVibrancy = (Object.values(notes) as NoteResonance[])
    .reduce((sum, n) => sum + n.value, 0) / 6;
  
  return {
    notes,
    domains,
    overallVibrancy,
    timestamp: Date.now(),
  };
}

function calculatePredominantTension(tensions: TensionType[]): TensionType | undefined {
  if (tensions.length === 0) return undefined;
  
  const counts = tensions.reduce((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {} as Record<TensionType, number>);
  
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0][0] as TensionType;
}
```

---

## Guidance Selection

```typescript
// lib/guidance.ts

export function selectGuidance(results: TuningResults): GuidanceItem[] {
  const guidance: GuidanceItem[] = [];
  
  // Sort notes by resonance (lowest first)
  const sortedNotes = (Object.entries(results.notes) as [Note, NoteResonance][])
    .sort((a, b) => a[1].value - b[1].value);
  
  // Get guidance for the 3 lowest-resonance notes
  sortedNotes.slice(0, 3).forEach(([note, resonance]) => {
    const item = getGuidanceForNote(note, resonance);
    guidance.push(item);
  });
  
  return guidance;
}

function getGuidanceForNote(note: Note, resonance: NoteResonance): GuidanceItem {
  const library = GUIDANCE_LIBRARY[note];
  
  // Select appropriate guidance based on resonance level and tension
  if (resonance.value < 0.3) {
    // Low resonance
    if (resonance.tension === 'tight') {
      return library.lowTight;
    } else if (resonance.tension === 'loose') {
      return library.lowLoose;
    }
    return library.low;
  } else if (resonance.value < 0.6) {
    // Mid resonance
    return library.mid;
  } else {
    // High resonance (still included for affirmation)
    return library.high;
  }
}

// Guidance library structure (content from CONTENT_SPEC.md)
const GUIDANCE_LIBRARY: Record<Note, GuidanceVariants> = {
  safety: {
    high: {
      note: 'safety',
      reflection: "Your foundation is solid. You trust life to hold you.",
      invitation: "Keep nurturing this ground.",
      practices: [
        "Share this sense of safety with someone who needs it",
        "Notice how your safety allows you to take risks",
      ],
    },
    lowTight: {
      note: 'safety',
      reflection: "Your nervous system is working overtime to keep you safe. The vigilance is exhausting.",
      invitation: "Find one place where you can let your guard down completely.",
      practices: [
        "Legs up the wall for 5 minutes — let gravity hold you",
        "Ask: What would I do if I knew I was completely safe?",
        "Create one physical anchor of safety",
      ],
    },
    lowLoose: {
      note: 'safety',
      reflection: "You may have learned to disconnect from safety rather than seek it. Numbness is protection too.",
      invitation: "Find small ways to feel held.",
      practices: [
        "Place hands on your body and say 'I'm here'",
        "Name five things you can see, four you can hear",
        "Find one person you can tell one truth to",
      ],
    },
    // ... etc
  },
  // ... other notes
};
```

---

## Color Utilities

```typescript
// lib/colors.ts

export const NOTE_COLORS = {
  safety: {
    high: '#A78BFA',
    mid: '#7C3AED',
    low: '#4C1D95',
    dim: '#2E1065',
  },
  pleasure: {
    high: '#F472B6',
    mid: '#EC4899',
    low: '#9D174D',
    dim: '#500724',
  },
  power: {
    high: '#E879F9',
    mid: '#C026D3',
    low: '#701A75',
    dim: '#4A044E',
  },
  light: {
    high: '#5EEAD4',
    mid: '#14B8A6',
    low: '#0F766E',
    dim: '#134E4A',
  },
  now: {
    high: '#60A5FA',
    mid: '#3B82F6',
    low: '#1E40AF',
    dim: '#1E3A5F',
  },
  heat: {
    high: '#4ADE80',
    mid: '#22C55E',
    low: '#166534',
    dim: '#14532D',
  },
} as const;

export function getColorForResonance(note: Note, value: number): string {
  const colors = NOTE_COLORS[note];
  
  if (value >= 0.75) return colors.high;
  if (value >= 0.5) return colors.mid;
  if (value >= 0.25) return colors.low;
  return colors.dim;
}

export function getGlowIntensity(value: number): number {
  // Returns 0-1 for glow opacity/intensity
  return Math.pow(value, 0.7); // Slightly non-linear for better visual
}

export function blendColors(colors: string[], weights: number[]): string {
  // Blend multiple colors based on weights
  // Implementation using color-mix or manual RGB blending
  // ...
}
```

---

## Supabase Schema (Paid Tier)

```sql
-- Users (managed by Supabase Auth)

-- Tuning Sessions
create table tuning_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  created_at timestamptz default now(),
  selected_domains text[] not null,
  answers jsonb not null,
  results jsonb,
  completed boolean default false
);

-- Row Level Security
alter table tuning_sessions enable row level security;

create policy "Users can view own sessions"
  on tuning_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on tuning_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own sessions"
  on tuning_sessions for update
  using (auth.uid() = user_id);

-- Indexes
create index tuning_sessions_user_id_idx on tuning_sessions(user_id);
create index tuning_sessions_created_at_idx on tuning_sessions(created_at desc);
```

---

## API Routes (Paid Tier)

```typescript
// app/api/sessions/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { data, error } = await supabase
    .from('tuning_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('tuning_sessions')
    .insert({
      user_id: session.user.id,
      selected_domains: body.selectedDomains,
      answers: body.answers,
      results: body.results,
      completed: body.completed,
    })
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
```

---

## Build Commands

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Environment Variables

```env
# .env.local

# Supabase (paid tier only)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id
```

---

## Performance Considerations

### Initial Load
- Keep bundle size minimal for free tier
- Lazy load visualization components
- Preload fonts with `next/font`

### Animations
- Use CSS transforms over layout properties
- Leverage GPU acceleration (`will-change`, `transform3d`)
- Respect `prefers-reduced-motion`

### State
- Persist only necessary data to localStorage
- Debounce frequent state updates
- Use shallow comparisons in selectors

### Images
- Use Next.js Image component
- Optimize any static assets
- Consider SVG for icons/illustrations
