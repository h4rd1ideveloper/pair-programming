'use server'

import {EmailContatoService} from "@/services/email-contato.service";
import {contatoSchema} from "@/validation/contato.schema";
import {ContatoServiceInterface} from "@/domain/interfaces/contato-service.interface";

type ContatoAction = {
    success: boolean, message: string, errors: { [key: string]: string[] },
}

export async function enviarContato(prevState: ContatoAction, formData: FormData): Promise<ContatoAction> {
    const parsed = contatoSchema.safeParse({
        nome: formData.get('nome'), email: formData.get('email'), mensagem: formData.get('mensagem'),
    })

    if (!parsed.success) {
        return {
            success: false, message: 'Erro de validação.', errors: parsed.error.flatten().fieldErrors,
        }
    }

    const contatoService: ContatoServiceInterface = new EmailContatoService()
    await contatoService.enviarContato(parsed.data)

    return {
        success: true, message: `Obrigado, ${parsed.data.nome}!`, errors: {},
    }
}
