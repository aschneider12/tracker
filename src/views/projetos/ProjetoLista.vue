<template>

    <div class="columns">
        <div class="column is-four-fifths">
            <div class="field">
                <p class="control has-icons-left">
                    <input type="text" class="input" placeholder="digite aqui sua busca remota, enviando para api"
                        v-model="filtroPesquisa">
                    <span class="icon is--small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
        </div>
        <div class="column">
            <RouterLink to="/projetos/novo" class="button">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
                <span>Novo projeto</span>
            </RouterLink>
        </div>

    </div>

    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>NOME</th>
                <th>ID</th>
                <th>ACOES</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in projetos" :key="p.id">
                <td>
                    {{ p.nome }}
                </td>
                <td>
                    {{ p.id }}
                </td>
                <td>
                    <router-link :to="`/projetos/${p.id}`" class="button is-info">
                        <span class="icon is-small">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </router-link>

                    <button class="button ml02 is-danger" @click="excluir(p.id)">
                        <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script lang="ts">

import { useStore } from "@/store";
import { computed, ref, watchEffect } from "vue";
import { ACTION_EXCLUIR_PROJETO, OBTER_PROJETOS } from "@/store/TipoAcoes";

export default {
    methods: {
        excluir(id: string) {
            this.store.dispatch(ACTION_EXCLUIR_PROJETO, id);
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)
        const filtroPesquisa = ref("");

        watchEffect(() => {
            store.dispatch(OBTER_PROJETOS, filtroPesquisa.value)
            setTimeout(() => {
                console.log(filtroPesquisa.value)
            }, 450)
        })

        return {
            store,
            projetos: computed(() => store.state.projeto.projetos),
            filtroPesquisa
        }
    }

}
</script>
