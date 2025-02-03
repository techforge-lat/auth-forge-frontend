import { z } from "zod";

export const appFormSchema = z.object({
	name: z.string().min(2, {
		message: "El nombre es obligatorio",
	}),
});
