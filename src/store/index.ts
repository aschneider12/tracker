
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { type INotificacao } from "@/interfaces/INotificacao";
import { projeto, type EstadoProjeto } from "./modules/projeto";
import { tarefa, type EstadoTarefa } from "./modules/tarefa";
import { NOTIFICAR } from "./TipoMutations";

export interface Estado {
    tarefa: EstadoTarefa,
    projeto: EstadoProjeto,
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projeto: {
            projetos: [],
        },
        tarefa: {
            tarefas: []
        },

        notificacoes: []
    },
    mutations: {
        [NOTIFICAR](state: { notificacoes: INotificacao[]; }, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter((ntf: { id: number; }) => ntf.id != novaNotificacao.id);
            }, 3000)
        }
    },
    actions: {
        //globais
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}