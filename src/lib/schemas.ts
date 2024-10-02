import { z } from 'zod';

export const emailSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' })
});

export type EmailSchema = typeof emailSchema;
export const signupSchema = z.object({
	username: z.string().min(5, { message: 'Must be 5 or more character long' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(5, { message: 'Must be 5 or more character long' })
});

export type SignupSchema = typeof signupSchema;

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(5, { message: 'Must be 5 or more character long' })
});

export type LoginSchema = typeof loginSchema;

export const urlSchema = z.object({
	url: z.string().url({ message: 'Invalid url' })
});

export type UrlSchema = typeof urlSchema;

export const folderSchema = z.object({
	folderName: z.string().min(1, 'Must be 1 or more character long')
});

export type folderSchema = typeof folderSchema;
