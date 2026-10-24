import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(60, { message: "Name is too long." })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(24, { message: "Username is too long." })
    .regex(/^[a-z0-9_]+$/, {
      message: "Use lowercase letters, numbers, and underscores only.",
    })
    .trim(),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-zA-Z]/, { message: "Include at least one letter." })
    .regex(/[0-9]/, { message: "Include at least one number." }),
});

export const LoginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }),
});

export const ArtworkFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title needs at least 2 characters." })
    .max(80, { message: "Title is too long." })
    .trim(),
  description: z
    .string()
    .min(10, { message: "Share a little more about the piece." })
    .max(800, { message: "Description is too long." })
    .trim(),
  medium: z
    .string()
    .min(2, { message: "Tell us the medium." })
    .max(40, { message: "Medium is too long." })
    .trim(),
  tags: z.string().max(120).optional(),
});

export const ProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(60)
    .trim(),
  bio: z.string().max(280, { message: "Bio is too long." }).trim(),
});
