import z from 'zod';

export const AppSchema = z.object({
    name: z.string(),
    developer_id: z.string(),
});