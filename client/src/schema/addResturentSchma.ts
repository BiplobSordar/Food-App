import { z } from "zod";

export const addResturentFromSchema = z.object({
    resturentName: z.string().nonempty({ message: 'Resturent Name is required' }),
    city: z.string().nonempty({ message: 'City is required' }),
    country: z.string().nonempty({ message: 'Country is required' }),
    deliveryTime: z.number().min(1,{ message: "Delivery time required" }) ,
    cuisines: z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),

})


export type addResturentFormType = z.infer<typeof addResturentFromSchema>