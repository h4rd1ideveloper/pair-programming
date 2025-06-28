import { z } from 'zod'

export const contatoSchema = z.object({
    nome: z.string().min(2,'Nome muito curto.'),
    email: z.string().email("Email invalido"),
    mensagem: z.string().min(10,'Mensagem muito curta.'),
})

export type ContatoData = z.infer<typeof contatoSchema>
