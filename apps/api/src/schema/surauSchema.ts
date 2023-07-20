import z from 'zod';

export const SurauSchema = z.object({
    name: z.string(),
    unique_name: z.string(),
    is_approved: z.boolean(),
    created_at: z.date(),
    is_approved_at: z.date(),
    brief_direction: z.string(),
    state: z.string(),
    district: z.string(),
    mall: z.string(),
    is_qiblat_certified: z.boolean(),
    user_id: z.string(),
    is_solat_jumaat: z.boolean(),
});