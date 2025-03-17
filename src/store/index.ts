import type IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { ADICIONAR_PROJETO, ADICIONAR_TAREFA, ALTERAR_PROJETO, ALTERAR_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA } from "./TipoMutations";
import type ITarefa from "@/interfaces/ITarefa";

export interface Estado {
    tarefas : ITarefa[],
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado> ({
    state: {
        projetos: [
            {id : '01', nome: 'Vuex'},
            {id : '02', nome: 'Spring'},
            {id : '03', nome: 'Security'}
        ],
        tarefas: [
            {
                id : '01',
                duracaoEmSegundos: 23,
                texto : 'Tarefa pre loaded',
                projeto : { id : '01', nome: 'Vuex' }
            }
        ]
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
        [ADICIONAR_TAREFA](state , tarefa: ITarefa) {
    
               //    id: string,
            //    duracaoEmSegundos: number,
            //      qq  texto: string,
            //    projeto: IProjeto
            console.log(state.tarefas)
            console.log('salvando tarefa no store')
            state.tarefas.push(tarefa)
        }
        // [ALTERAR_TAREFA](state , tarefa: ITarefa) {
            
        //     const index = state.tarefas.findIndex(tar => tar.id == tarefa.id);
        //     state.projetos[index] = tarefa;
        // },
        // [EXCLUIR_TAREFA](state , id: string) {
        //     state.tarefas = state.tarefas.filter(tar => tar.id != id);
            
        // }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}