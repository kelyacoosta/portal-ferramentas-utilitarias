import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema } from "../schemas/todoSchema"
import type { TaskFormData } from "../schemas/todoSchema"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

type Task = {
    id: number
    title: string
    category: string
    done: boolean
}

export default function TaskMaster() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks")
        return saved ? JSON.parse(saved) : []
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
    })

    function onSubmit(data: TaskFormData) {
        const newTask: Task = {
            id: Date.now(),
            title: data.title,
            category: data.category,
            done: false,
        }

        setTasks((prev) => [...prev, newTask])
        reset()
    }

    function removeTask(id: number) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    function toggleDone(id: number) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        )
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    TaskMaster
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <Input
                        placeholder="Título da tarefa"
                        {...register("title")}
                        error={errors.title?.message}
                    />

                    <select
                        className="px-3 py-2 rounded-xl border"
                        {...register("category")}
                    >
                        <option value="">Selecione a categoria</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Pessoal">Pessoal</option>
                        <option value="Urgente">Urgente</option>
                    </select>

                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                    )}

                    <Button
                        type="submit"
                        className="bg-gray-900 text-white hover:opacity-90"
                    >
                        Adicionar
                    </Button>
                </form>

                <ul className="mt-4 flex flex-col gap-2">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl"
                        >
                            <span className={task.done ? "line-through opacity-60" : ""}>
                                <strong>{task.title}</strong> ({task.category})
                            </span>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => toggleDone(task.id)}
                                    className="bg-gray-900 text-white px-3 py-1"
                                >
                                    Concluído
                                </Button>

                                <Button
                                    onClick={() => removeTask(task.id)}
                                    className="bg-gray-900 text-white px-3 py-1"
                                >
                                    Remover
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}