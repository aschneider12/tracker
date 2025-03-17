<template>
 
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span> 
        </RouterLink>

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
import { computed } from "vue";
import { EXCLUIR_PROJETO } from "@/store/TipoMutations";

export default {
    methods: {
        excluir (id: string) {
            this.store.commit(EXCLUIR_PROJETO, id);
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            projetos : computed(() => store.state.projetos)
        }
    }

}
</script>

