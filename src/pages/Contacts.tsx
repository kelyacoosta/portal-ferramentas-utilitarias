import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "../schemas/contactSchema"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

type Contact = {
    id: number
    name: string
    email: string
    phone: string
}

export default function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    function onSubmit(data: ContactFormData) {
        const newContact: Contact = {
            id: Date.now(),
            ...data,
        }

        setContacts([...contacts, newContact])
        reset()
    }

    function removeContact(id: number) {
        setContacts(contacts.filter((c) => c.id !== id))
    }

    useEffect(() => {
        const saved = localStorage.getItem("contacts")
        if (saved) setContacts(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    ConnectHub
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
                    <Input
                        placeholder="Nome completo"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <Input
                        placeholder="Email"
                        type="email"
                        {...register("email")}
                        error={errors.email?.message}
                    />

                    <Input
                        placeholder="Telefone (ex: 21999999999)"
                        {...register("phone")}
                        error={errors.phone?.message}
                    />

                    <Button
                        type="submit"
                        className="bg-gray-900 text-white"
                    >
                        Adicionar
                    </Button>
                </form>

                <ul className="mt-4 flex flex-col gap-2">
                    {contacts.map((c) => (
                        <li
                            key={c.id}
                            className="bg-gray-50 rounded-xl px-3 py-2 flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">{c.name}</div>
                                <div className="text-sm opacity-70">{c.email}</div>
                                <div className="text-sm opacity-70">{c.phone}</div>
                            </div>

                            <Button
                                onClick={() => removeContact(c.id)}
                                className="bg-gray-900 text-white px-3 py-1"
                            >
                                Remover
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}