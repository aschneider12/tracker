import type IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { ADICIONAR_PROJETO, ADICIONAR_TAREFA, ALTERAR_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./TipoMutations";
import type ITarefa from "@/interfaces/ITarefa";
import { type INotificacao } from "@/interfaces/INotificacao";
import { CADASTRAR_PROJETO, OBTER_PROJETOS, ACTION_EXCLUIR_PROJETO, ACT_OBTER_TAREFAS, ACT_CADASTRAR_TAREFA, ACT_ALTERAR_TAREFA, ACT_REMOVER_TAREFA } from "./TipoAcoes";
import http from '../http'

export interface Estado {
    tarefas : ITarefa[],
    projetos: IProjeto[],
    notificacoes : INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado> ({
    state: {
        projetos: [
           
        ],
        tarefas: [
           
        ],
        notificacoes : []
    },
    mutations: {
        [ADICIONAR_PROJETO](state , nomeDoProjeto: string) {
            
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state , projeto: IProjeto) {
            
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state , id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
            
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos;
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas;
        },
        [ADICIONAR_TAREFA](state , tarefa: ITarefa) {
    
               //    id: string,
            //    duracaoEmSegundos: number,
            //      qq  texto: string,
            //    projeto: IProjeto
            console.log(state.tarefas)
            console.log('salvando tarefa no store')
            state.tarefas.push(tarefa)
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(ntf => ntf.id != novaNotificacao.id);
            }, 3000)
        }
        // [ALTERAR_TAREFA](state , tarefa: ITarefa) {
            
        //     const index = state.tarefas.findIndex(tar => tar.id == tarefa.id);
        //     state.projetos[index] = tarefa;
        // },
        // [EXCLUIR_TAREFA](state , id: string) {
        //     state.tarefas = state.tarefas.filter(tar => tar.id != id);
            
        // }
    }, 
    actions: {
        [OBTER_PROJETOS]({commit}){
            http.get('projetos')
                .then(response => commit(DEFINIR_PROJETOS, response.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })   
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [ACTION_EXCLUIR_PROJETO]({commit}, id: string) {
            return http.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [ACT_OBTER_TAREFAS]({commit}){
            http.get('tarefas')
                .then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [ACT_CADASTRAR_TAREFA](contexto, nomeDoProjeto: string) {
            return http.post('/tarefas', {
                nome: nomeDoProjeto
            })   
        },
        [ACT_ALTERAR_TAREFA](contexto, projeto: IProjeto) {
            return http.put(`/tarefas/${projeto.id}`, projeto)
        },
        [ACT_REMOVER_TAREFA]({commit}, id: string) {
            return http.delete(`/tarefas/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id))
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}