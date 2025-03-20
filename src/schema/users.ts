import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const AddressSchema = z.object({
    userId: z.coerce.number(), // Converts string to number if needed
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pinCode: z.string().length(6, "Pincode must be 6 digits"), // Fixed typo
});

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().nullable(), 
    defaultBillingAddress: z.number().nullable(), 
  });
  