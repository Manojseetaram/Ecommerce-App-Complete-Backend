import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const AddressSchema = z.object({
    lineOne :z.string(),
    lineTwo :z.string().nullable(),
    city :z.string(),
    state :z.string(),
    country :z.string(),
    pincode :z.string ().length(6),
  
})