import type IProjeto from "./IProjeto";

export default interface ITarefa {
    id: string,
    duracaoEmSegundos: number,
    texto: string,
    projeto: IProjeto
}