'use client'

import {useActionState} from 'react'
import {enviarContato} from "@/actions/contato.action";
import {withClientOnly} from "@/HOC/withClientOnly";


function ContatoPage() {
    const [state, formAction, isPending] = useActionState(enviarContato, {
        success: false, message: '', errors: {},
    })
    return (<div className="min-h-screen flex items-center">
        <form action={formAction} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Entre em Contato</h2>
            <div className="space-y-4">
                <input
                    name="nome"
                    placeholder="Nome"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state.errors?.nome && <p className="text-red-500 text-sm">{state.errors.nome}</p>}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                <textarea
                    name="mensagem"
                    placeholder="Mensagem"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state.errors?.mensagem && <p className="text-red-500 text-sm">{state.errors.mensagem}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    {isPending ? 'Enviando...' : 'Enviar'}
                </button>
                {state.message && (state.success) &&
                    <p className="text-green-600 text-center font-medium">{state.message}</p>}
            </div>
        </form>
    </div>)
}
export default withClientOnly(ContatoPage)