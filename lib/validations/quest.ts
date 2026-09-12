import { z } from 'zod';

export const questDifficultySchema = z.enum(['easy', 'medium', 'hard', 'epic']);
export const attributeTypeSchema = z.enum(['strength', 'intellect', 'discipline', 'creativity']);
export const questRecurrenceSchema = z.enum(['none', 'daily']);

export const createQuestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Quest title cannot be empty.' })
    .max(120, { message: 'Quest title is too long (max 120 characters).' }),
  description: z.string().trim().default(''),
  category: z.string().trim().min(1).default('general'),
  difficulty: questDifficultySchema,
  attribute: attributeTypeSchema,
  is_recurring: z.boolean().default(false),
  recurrence: questRecurrenceSchema.default('none'),
});

export const editQuestSchema = createQuestSchema.partial();

export type CreateQuestInput = z.infer<typeof createQuestSchema>;
export type EditQuestInput = z.infer<typeof editQuestSchema>;
