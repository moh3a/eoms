import { z } from "zod";

/**
 * Validate the environment variables on server start
 */
export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});
export type Env = z.infer<typeof envSchema>;
