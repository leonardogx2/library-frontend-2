import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  img_path: z.string(),
  systemEntryDate: z.string(),
  synopsis: z.string(),
});
