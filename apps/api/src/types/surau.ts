export type Surau = {
    id: string
    name: string
    unique_name: string
    is_approved: boolean
    created_at: Date
    is_approved_at: Date
    state: string
    district: string
    mall: string
    brief_direction: string
    is_qiblat_certified: boolean
    user_id: string
    is_solat_jumaat: boolean
    surau_photos: SurauPhoto[]
} | undefined

export type SurauPhoto = {
    file_path: string
}