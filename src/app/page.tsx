'use client'
import {useCallback, useMemo, useRef, useState} from 'react'

type Task = {
    id: number; title: string; completed: boolean;
}
const initialTasks: Task[] = [{id: 1, title: 'Study', completed: false}, {id: 2, title: 'Typescript', completed: true},]

enum Filter {
    all = 0, pending = 1, done = 2,
}

export default function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [filter, setFilter] = useState<Filter>(Filter.all)

    const newTaskInputRef = useRef<HTMLInputElement>(null)

    const filteredTasks = useMemo(() => tasks.filter((task) => filter === Filter.done ? task.completed : filter === Filter.pending ? !task.completed : true), [filter, tasks])

    const addTask = useCallback(() => {
        const title = newTaskInputRef.current?.value.trim()
        if (!title) return;
        const newTask: Task = {id: tasks.length+1, title, completed: false}
        setTasks(prevTasks => [...prevTasks, newTask])
        if (newTaskInputRef.current) newTaskInputRef.current.value = ""
    }, [tasks.length])

    const toggleTaskStatus = useCallback((target: number) => {
        setTasks(prevState => prevState.map((task) => task.id === target ? {
            ...task, completed: !task.completed
        } : task))
    }, [])

    return (<main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Tarefas</h1>
        <div className="flex gap-2 mb-4">
            <input
                ref={newTaskInputRef}
                className="border rounded px-2 py-1 flex-1"
                placeholder="Nova tarefa"
            />
            <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={addTask}
            >
                Adicionar
            </button>
        </div>

        <div className="flex gap-2 mb-4">
            {[Filter.all, Filter.pending, Filter.done].map((f, index) => (<button
                key={index}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'}`}
            >
                {f === Filter.all ? 'Todas' : f === Filter.pending ? 'Pendentes' : 'Concluídas'}
            </button>))}
        </div>

        <ul className="space-y-2">
            {filteredTasks.map((task, index) => (
                <li key={index} className="flex justify-between items-center border p-2 rounded">
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
                    <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                    >
                        {task.completed ? 'Desfazer' : 'Concluir'}
                    </button>
                </li>))}
        </ul>
    </main>)
}