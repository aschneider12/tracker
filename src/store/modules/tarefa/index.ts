import http from "@/http";
import type ITarefa from "@/interfaces/ITarefa";
import type { Estado } from "@/store";
import { ACT_ALTERAR_TAREFA, ACT_CADASTRAR_TAREFA, ACT_OBTER_TAREFAS, ACT_REMOVER_TAREFA } from "@/store/TipoAcoes";
import { ADICIONAR_TAREFA, ALTERAR_TAREFA, DEFINIR_TAREFAS, EXCLUIR_TAREFA } from "@/store/TipoMutations";
import type { Module } from "vuex";

export interface EstadoTarefa {

    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [DEFINIR_TAREFAS](state: { tarefas: ITarefa[]; }, tarefas: ITarefa[]){
            state.tarefas = tarefas;
        },
        [ADICIONAR_TAREFA](state: { tarefas: ITarefa[]; } , tarefa: ITarefa) {
            console.log(state.tarefas)
            console.log('salvando tarefa no store')
            state.tarefas.push(tarefa)
        },
        
        [ALTERAR_TAREFA](state , tarefa: ITarefa) {
            
             const index = state.tarefas.findIndex(tar => tar.id == tarefa.id);
             state.projetos[index] = tarefa;
        },
        [EXCLUIR_TAREFA](state , id: string) {
             state.tarefas = state.tarefas.filter(tar => tar.id != id);
            
        }
    },
    actions: {
        [ACT_OBTER_TAREFAS]({commit}){
            http.get('tarefas')
                .then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [ACT_CADASTRAR_TAREFA]( { commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
            .then(response => commit(ADICIONAR_TAREFA, response.data))
        },
        [ACT_ALTERAR_TAREFA]( {commit}, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(() => commit(ALTERAR_TAREFA, tarefa))
        },
        [ACT_REMOVER_TAREFA]({commit}, id: string) {
            return http.delete(`/tarefas/${id}`)
            .then(() => commit(EXCLUIR_TAREFA, id))
        }
    }

}