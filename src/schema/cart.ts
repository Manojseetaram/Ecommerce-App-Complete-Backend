import {z} from "zod";

export const CreateCartSchema = z.object({
    productId  : z.number(),
    quntity : z.number()
})
export const ChangeQuntitySchema = z.object({
    quntity : z.number()
})