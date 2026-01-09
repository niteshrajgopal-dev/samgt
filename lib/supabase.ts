import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Driver = {
    id: string
    clerk_user_id?: string
    name: string
    team?: string
    nationality?: string
    psn_id?: string
    avatar_url?: string
    created_at: string
    updated_at: string
}

export type Season = {
    id: string
    name: string
    year: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export type Championship = {
    id: string
    season_id: string
    name: string
    game: string
    platform: string
    description?: string
    created_at: string
    updated_at: string
}

export type Event = {
    id: string
    championship_id: string
    name: string
    track: string
    event_date: string
    status: 'upcoming' | 'open' | 'live' | 'completed'
    max_entries: number
    image_url?: string
    created_at: string
    updated_at: string
}

export type EventRegistration = {
    id: string
    event_id: string
    driver_id: string
    registered_at: string
}

export type Result = {
    id: string
    event_id: string
    driver_id: string
    position: number
    points: number
    fastest_lap: boolean
    created_at: string
    updated_at: string
}

export type DriverStatistics = {
    id: string
    name: string
    team?: string
    nationality?: string
    psn_id?: string
    avatar_url?: string
    races: number
    wins: number
    podiums: number
    total_points: number
}

export type ChampionshipStanding = {
    championship_id: string
    championship_name: string
    driver_id: string
    driver_name: string
    team?: string
    avatar_url?: string
    races: number
    wins: number
    podiums: number
    points: number
    position: number
}
