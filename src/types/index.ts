// ========== Core Types ==========

export type Note = 'safety' | 'pleasure' | 'power' | 'light' | 'now' | 'heat';

export type Triad = 'feminine' | 'masculine';

export type Domain =
  | 'spirit'
  | 'body'
  | 'self'
  | 'relationships'
  | 'wealth'
  | 'purpose'
  | 'play';

export type ResonanceLevel = 'high' | 'mid-high' | 'mid' | 'mid-low' | 'low';

export type TensionType = 'tight' | 'balanced' | 'loose';

// ========== Question Types ==========

export interface AnswerOption {
  id: string;
  text: string;
  resonance: ResonanceLevel;
  tension?: TensionType;
}

export interface Question {
  id: string;
  note: Note;
  domain?: Domain; // Optional — some questions are general
  text: string;
  subtext?: string; // Soft invitation or context
  options: AnswerOption[];
}

// ========== User Response Types ==========

export interface Answer {
  questionId: string;
  optionId: string;
  timestamp: number;
}

// ========== Results Types ==========

export interface NoteResonance {
  value: number; // 0-1 scale
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

// ========== Session Types ==========

export interface TuningSession {
  id: string;
  userId?: string; // Only for paid/logged-in users
  createdAt: number;
  selectedDomains: Domain[];
  answers: Answer[];
  results?: TuningResults;
  completed: boolean;
}

// ========== Guidance Types ==========

export interface GuidanceItem {
  note: Note;
  domain?: Domain;
  reflection: string;
  invitation: string;
  practices: string[];
}

// ========== Visualization Types ==========

export type VisualizationType = 'chord' | 'waveform' | 'orb' | 'flower' | 'particles';

export interface VisualizationProps {
  results: TuningResults;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// ========== Domain Metadata ==========

export interface DomainInfo {
  id: Domain;
  name: string;
  description: string;
  icon?: string;
}

export const DOMAINS: DomainInfo[] = [
  {
    id: 'spirit',
    name: 'Spirit',
    description: 'God, Universe, Energy, Source, the Quantum',
  },
  {
    id: 'body',
    name: 'Body',
    description: 'Health, feelings, sensations, lived experience',
  },
  {
    id: 'self',
    name: 'Self',
    description: 'Mind, identity, self-awareness, inner narrative',
  },
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Others, love, intimacy, self-love reflected',
  },
  {
    id: 'wealth',
    name: 'Wealth',
    description: 'Money, prosperity, abundance, provision',
  },
  {
    id: 'purpose',
    name: 'Purpose',
    description: 'Impact, contribution, legacy, meaning',
  },
  {
    id: 'play',
    name: 'Play',
    description: 'Fun, adventure, lightness, joy',
  },
];

// ========== Note Metadata ==========

export interface NoteInfo {
  id: Note;
  name: string;
  triad: Triad;
  essence: string;
  color: string;
}

export const NOTES: NoteInfo[] = [
  {
    id: 'safety',
    name: 'Safety',
    triad: 'feminine',
    essence: 'The ground from which expansion happens',
    color: 'safety',
  },
  {
    id: 'pleasure',
    name: 'Pleasure',
    triad: 'feminine',
    essence: 'The guidance system — where life is flowing',
    color: 'pleasure',
  },
  {
    id: 'power',
    name: 'Power',
    triad: 'feminine',
    essence: 'Capacity to create and choose',
    color: 'power',
  },
  {
    id: 'light',
    name: 'Light',
    triad: 'masculine',
    essence: 'Illumination, clarity — seeing what\'s here',
    color: 'light',
  },
  {
    id: 'now',
    name: 'Now',
    triad: 'masculine',
    essence: 'Presence — where creation happens',
    color: 'now',
  },
  {
    id: 'heat',
    name: 'Heat',
    triad: 'masculine',
    essence: 'Creative tension — life force',
    color: 'heat',
  },
];

// ========== Utility Types ==========

export type TuningPhase = 'welcome' | 'domain-select' | 'tuning' | 'transition' | 'results';

// Re-export database types
export * from './database';
