import {ContatoData} from "@/validation/contato.schema";

export interface ContatoServiceInterface {
    enviarContato(contato: ContatoData): Promise<void>
}