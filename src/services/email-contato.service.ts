
import {ContatoServiceInterface} from "@/domain/interfaces/contato-service.interface";
import {ContatoData} from "@/validation/contato.schema";

export class EmailContatoService implements ContatoServiceInterface {
    async enviarContato(data: ContatoData): Promise<void> {
        console.log('📨 E-mail enviado com dados:', data)
    }
}
