<template>

        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do projeto</label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="fiel">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>

</template>

<script lang="ts">

import { useStore } from "@/store";
import { computed } from "vue";
import { ALTERAR_PROJETO, ADICIONAR_PROJETO } from "@/store/TipoMutations";
export default {
    props : {
        id : {
            type : String
        }
    },
    mounted () {
        if(this.id) {
            const projetoEditando = this.store.state.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projetoEditando.nome
        }
    },
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar() {

            if(this.id) {
                
                this.store.commit(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                });

            } else {

                this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto);
            }
            this.nomeDoProjeto = '';
         
            this.$router.push('/projetos');
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

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>