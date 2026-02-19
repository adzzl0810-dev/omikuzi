
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
            user_credits: {
                Row: {
                    id: string
                    user_id: string
                    credits: number
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    credits?: number
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    credits?: number
                    updated_at?: string | null
                }
            }
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
        Functions: {
            perform_reading: {
                Args: {
                    p_input_text: string
                    p_fortune_level: string
                    p_advice_json: Json
                    p_lucky_item: string
                    p_god_name: string
                    p_god_image_url?: string | null
                }
                Returns: Json
            }
            migrate_anonymous_readings: {
                Args: {
                    anonymous_user_id: string
                }
                Returns: void
            }
        }
    }
}
