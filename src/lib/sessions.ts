import { supabase } from './supabase'
import type { TuningSession, Domain, Answer, TuningResults } from '@/types'

// Database row type (what we get from Supabase)
interface DbSessionRow {
  id: string
  user_id: string | null
  created_at: string
  completed_at: string | null
  selected_domains: Domain[]
  answers: Answer[]
  results: TuningResults | null
  completed: boolean
}

// Convert database row to app session
function fromDbSession(row: DbSessionRow): TuningSession {
  return {
    id: row.id,
    userId: row.user_id ?? undefined,
    createdAt: new Date(row.created_at).getTime(),
    selectedDomains: row.selected_domains,
    answers: row.answers,
    results: row.results ?? undefined,
    completed: row.completed,
  }
}

// Save a session to Supabase
export async function saveSession(
  session: TuningSession,
  userId: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('tuning_sessions')
    .upsert({
      id: session.id,
      user_id: userId,
      selected_domains: session.selectedDomains,
      answers: session.answers,
      results: session.results ?? null,
      completed: session.completed,
    } as never, { onConflict: 'id' })

  if (error) {
    console.error('Error saving session:', error)
    return { error: error.message }
  }

  return { error: null }
}

// Get all sessions for a user
export async function getUserSessions(
  userId: string
): Promise<{ data: TuningSession[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('tuning_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching sessions:', error)
    return { data: null, error: error.message }
  }

  return {
    data: (data as unknown as DbSessionRow[]).map(fromDbSession),
    error: null,
  }
}

// Get a single session by ID
export async function getSession(
  sessionId: string
): Promise<{ data: TuningSession | null; error: string | null }> {
  const { data, error } = await supabase
    .from('tuning_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error) {
    console.error('Error fetching session:', error)
    return { data: null, error: error.message }
  }

  return {
    data: fromDbSession(data as unknown as DbSessionRow),
    error: null,
  }
}

// Delete a session
export async function deleteSession(
  sessionId: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('tuning_sessions')
    .delete()
    .eq('id', sessionId)

  if (error) {
    console.error('Error deleting session:', error)
    return { error: error.message }
  }

  return { error: null }
}
