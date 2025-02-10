import { z } from "zod";

export const signupSchema = z.object({
 username: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
    contact: z
    .string()
    .regex(/^0\d{10}$/, "Contact number must start with 0 and be exactly 11 digits"),
  
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
  .string()
  .email("Invalid email address"),
  password: z
  .string()
  .min(6, "Password must be at least 6 characters.")
});

export type LoginFormData = z.infer<typeof loginSchema>;
