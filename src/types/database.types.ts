
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string | null
                    readings_count: number
                    created_at: string
                    last_active_date?: string | null
                    streak_days?: number
                }
                Insert: {
                    id: string
                    email?: string | null
                    readings_count?: number
                    created_at?: string
                    last_active_date?: string | null
                    streak_days?: number
                }
                Update: {
                    id?: string
                    email?: string | null
                    readings_count?: number
                    created_at?: string
                    last_active_date?: string | null
                    streak_days?: number
                }
            }
            readings: {
                Row: {
                    id: string
                    user_id: string | null
                    input_text: string | null
                    fortune_level: string | null
                    advice_json: Json | null
                    lucky_item: string | null
                    god_name: string | null
                    god_image_url: string | null
                    is_paid: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    input_text?: string | null
                    fortune_level?: string | null
                    advice_json?: Json | null
                    lucky_item?: string | null
                    god_name?: string | null
                    god_image_url?: string | null
                    is_paid?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    input_text?: string | null
                    fortune_level?: string | null
                    advice_json?: Json | null
                    lucky_item?: string | null
                    god_name?: string | null
                    god_image_url?: string | null
                    is_paid?: boolean
                    created_at?: string
                }
            }
            zazen_sessions: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string
                    duration_seconds: number
                    completed_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id: string
                    duration_seconds: number
                    completed_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string
                    duration_seconds?: number
                    completed_at?: string
                }
            }
            goshuin_entries: {
                Row: {
                    id: string
                    user_id: string
                    awarded_at: string
                    design_id: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    awarded_at?: string
                    design_id: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    awarded_at?: string
                    design_id?: string
                }
            }
            ema_offerings: {
                Row: {
                    id: string
                    user_id: string
                    content: string
                    is_public: boolean
                    likes_count: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    content: string
                    is_public?: boolean
                    likes_count?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    content?: string
                    is_public?: boolean
                    likes_count?: number
                    created_at?: string
                }
            }
        }
    }
}
