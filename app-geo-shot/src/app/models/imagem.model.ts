import { Cliente } from "./cliente.model";
import { Ponto } from "./ponto.model";

export class Imagem {
    id?: number;
    descricao: string;
    imagem: string;
    fotografo: Cliente;
    coordenadas: Ponto;
    distancia?: number;
}