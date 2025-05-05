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
import { computed, ref } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/TipoAcoes";

export default {
    props : {
        id : {
            type : String
        }
    },
    mixins: [
        notificacaoMixin
    ],
    // mounted () {
    //     if(this.id) {
    //         const projetoEditando = this.store.state.projetos.find(proj => proj.id == this.id);
    //         this.nomeDoProjeto = projetoEditando.nome
    //     }
    // },
    // data() {
    //     return {
    //         nomeDoProjeto: ''
    //     }
    // },
    methods: {
        salvar() {

            if(this.id) {
                
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then( () => this.sucesso()
                ).catch( (error) => {
                    console.log(error)
                })

            } else {

                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto).
                then(() => this.sucesso()
                ).catch( (error) => {
                    this.fracasso(error.message)
                })
            }
            
        },
        sucesso(){
            this.notificar(TipoNotificacao.SUCCESS, 'Pronto', 'Projeto '+this.nomeDoProjeto+' salvo!');
                    this.nomeDoProjeto = '';
                    this.$router.push('/projetos');
        },
        fracasso(msg) {
            this.notificar(TipoNotificacao.ERROR, 'Falha', msg);                   
        }
       
    },
    setup(props) {
        const store = useStore()
        const nomeDoProjeto = ref("")

        if(props.id) {
            const projetoEditando = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projetoEditando?.nome || ""
        }

        return {
            store,
            projetos : computed(() => store.state.projeto.projetos),
            nomeDoProjeto
        }
    }

}
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>