import type { Domain, Answer, TuningResults } from './index'

// ========== Database Row Types ==========

export interface Profile {
  id: string
  email: string | null
  display_name: string | null
  created_at: string
  updated_at: string
}

export interface TuningSessionRow {
  id: string
  user_id: string | null
  created_at: string
  completed_at: string | null
  selected_domains: Domain[]
  answers: Answer[]
  results: TuningResults | null
  completed: boolean
}

// ========== Insert Types ==========

export interface ProfileInsert {
  id: string
  email?: string | null
  display_name?: string | null
}

export interface TuningSessionInsert {
  id?: string
  user_id?: string | null
  selected_domains: Domain[]
  answers?: Answer[]
  results?: TuningResults | null
  completed?: boolean
}

// ========== Update Types ==========

export interface ProfileUpdate {
  email?: string | null
  display_name?: string | null
}

export interface TuningSessionUpdate {
  selected_domains?: Domain[]
  answers?: Answer[]
  results?: TuningResults | null
  completed?: boolean
  completed_at?: string | null
}

// ========== Database Schema Type ==========

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      tuning_sessions: {
        Row: TuningSessionRow
        Insert: TuningSessionInsert
        Update: TuningSessionUpdate
      }
    }
  }
}
