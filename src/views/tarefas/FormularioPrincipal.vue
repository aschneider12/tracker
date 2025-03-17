<template>

    <div class="box formulario">
        
            <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="informe a tarefa que vai iniciar"
                v-model="descricao" />

            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto"  @change="console.log('Selecionado:', idProjeto)" >
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.id }} - {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column is-2">
                <TemporizadorTarefa @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import TemporizadorTarefa from '@/views/tarefas/TemporizadorTarefa.vue';
import { useStore } from "@/store";
import { computed } from "vue";

export default {
    components: {
        TemporizadorTarefa
    }, 
    data (){
        return {
            idProjeto: '',
            descricao: ''
        }
    },
    methods: {
        onProjetoSelecionado() {
            console.log('Projeto selecionado:', this.idProjeto);
        },
        finalizarTarefa(tempoDecorrido: number) : void{
           
            console.log('Chamando pra salvar');
            
           const projetoEncontrado = this.projetos.find((proj: { id: string; }) => (proj.id == this.idProjeto));

           console.log('Encontrado', projetoEncontrado);

            //new ITarefa
            this.$emit('aoSalvarTarefa',  {
                duracaoEmSegundos: tempoDecorrido,
                texto: this.descricao,
                projeto: projetoEncontrado
            })
            console.log(tempoDecorrido, this.descricao)
            this.descricao = '';
        }
    },
    emits: [
        'aoSalvarTarefa'
    ],
    setup() {
        const store = useStore()
        return {
            store,
            projetos : computed(() => store.state.projetos)
        }
    
    }
    
}
</script>

<style>

.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>