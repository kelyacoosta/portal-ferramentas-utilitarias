import { z } from "zod"

export const financeSchema = z.object({
    description: z.string().min(3, "Informe uma descrição válida"),

    amount: z
        .string()
        .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
            message: "O valor não pode ser 0 ou negativo",
        }),

    type: z.enum(["income", "expense"], {
        message: "Selecione o tipo",
    }),

    date: z.string().min(1, "Informe a data"),
})

export type financeFormData = z.infer<typeof financeSchema>