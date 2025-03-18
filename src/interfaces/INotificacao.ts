export enum TipoNotificacao {
    SUCCESS,
    WARN,
    ERROR
}
export interface INotificacao { 
    titulo : string,
    texto : string,
    tipo : TipoNotificacao,
    id: number
}