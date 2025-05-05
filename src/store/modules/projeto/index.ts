import http from "@/http";
import type IProjeto from "@/interfaces/IProjeto";
import type { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ACTION_EXCLUIR_PROJETO } from "@/store/TipoAcoes";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/TipoMutations";
import type { Module } from "vuex";

export interface EstadoProjeto {

    projetos: IProjeto
}

export const projeto: Module<EstadoProjeto, Estado> = {
    state : {
        projetos: []
    },
    mutations: {
        [ADICIONAR_PROJETO](state: { projetos: IProjeto[]; }, nomeDoProjeto: string) {

            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state: { projetos: any[]; }, projeto: IProjeto) {

            const index = state.projetos.findIndex((proj: { id: string; }) => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state: { projetos: IProjeto[]; }, id: string) {
            state.projetos = state.projetos.filter((proj: { id: string; }) => proj.id != id);

        },
        [DEFINIR_PROJETOS](state: { projetos: IProjeto[]; }, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }, filtro: string) {

            let url = 'projetos'
            if(filtro) {
                url += '?id='+filtro
            }

            http.get(url)
                .then(response => commit(DEFINIR_PROJETOS, response.data))
        },
        [CADASTRAR_PROJETO](contexto: any, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto: any, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [ACTION_EXCLUIR_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        } 
    }

}