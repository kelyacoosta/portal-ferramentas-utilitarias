import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { financeSchema } from "../schemas/financeSchema"
import type { financeFormData } from "../schemas/financeSchema"

type Finance = {
    id: number
    description: string
    amount: number
    type: "income" | "expense"
    date: string
}

export default function Finances() {
    const [items, setItems] = useState<Finance[]>(() => {
        const saved = localStorage.getItem("finances")
        return saved ? JSON.parse(saved) : []
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<financeFormData>({
        resolver: zodResolver(financeSchema),
    })

    function onSubmit(data: financeFormData) {
        const newItem: Finance = {
            id: Date.now(),
            description: data.description,
            amount: Number(data.amount),
            type: data.type,
            date: data.date,
        }

        setItems([...items, newItem])
        reset()
    }

    function removeItem(id: number) {
        setItems(items.filter((i) => i.id !== id))
    }

    useEffect(() => {
        localStorage.setItem("finances", JSON.stringify(items))
    }, [items])

    const balance = items.reduce((acc, item) => {
        return item.type === "income"
            ? acc + item.amount
            : acc - item.amount
    }, 0)

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-2xl">
                <h1 className="text-2xl font-semibold mb-2 text-center">
                    MoneyFlow
                </h1>

                <p className="text-center text-lg font-semibold mb-6">
                    Saldo Total: R$ {balance}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Descrição"
                        {...register("description")}
                        className="border rounded-lg p-2"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}

                    <input
                        type="text"
                        placeholder="Valor"
                        {...register("amount")}
                        className="border rounded-lg p-2"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm">{errors.amount.message}</p>
                    )}

                    <select {...register("type")} className="border rounded-lg p-2">
                        <option value="">Tipo</option>
                        <option value="income">Entrada</option>
                        <option value="expense">Saída</option>
                    </select>
                    {errors.type && (
                        <p className="text-red-500 text-sm">{errors.type.message}</p>
                    )}

                    <input
                        type="date"
                        {...register("date")}
                        className="border rounded-lg p-2"
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm">{errors.date.message}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg p-2"
                    >
                        Adicionar
                    </button>
                </form>

                <ul className="mt-6 flex flex-col gap-2">
                    {items.map((i) => (
                        <li
                            key={i.id}
                            className="flex justify-between items-center border rounded-lg p-3"
                        >
                            <div>
                                <p className="font-medium">{i.description}</p>
                                <p className="text-sm text-gray-500">
                                    {i.type === "income" ? "Entrada" : "Saída"} • R$ {i.amount} • {i.date}
                                </p>
                            </div>

                            <button
                                onClick={() => removeItem(i.id)}
                                className="bg-black text-white px-3 py-1 rounded"
                            >
                                Remover
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}