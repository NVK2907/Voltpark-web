import { z } from 'zod';

const booleanFromString = z.string().transform((v) => v === 'true');

/**
 * Environment variable schema — app will fail-fast if any required variable is missing or invalid.
 */
const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1),
  VITE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_API_BASE_URL: z.string().url(),
  VITE_ENABLE_DEVTOOLS: booleanFromString
    .pipe(z.boolean())
    .optional()
    .transform((v) => v ?? false),
  VITE_ENABLE_MSW: booleanFromString
    .pipe(z.boolean())
    .optional()
    .transform((v) => v ?? false),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. Check .env file.');
}

/** Validated, typed environment config. */
export const env = parsed.data;

export type Env = z.infer<typeof envSchema>;
