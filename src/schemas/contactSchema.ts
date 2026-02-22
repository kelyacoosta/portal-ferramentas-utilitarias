import { z } from "zod"

export const contactSchema = z.object({
    name: z
        .string()
        .min(3, "Nome obrigatório")
        .refine((value) => value.trim().split(" ").length >= 2, {
            message: "Informe nome completo",
        }),

    email: z.string().email("Email inválido"),

    phone: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone deve ter DDD + número (10 ou 11 dígitos)"),
})

export type ContactFormData = z.infer<typeof contactSchema>