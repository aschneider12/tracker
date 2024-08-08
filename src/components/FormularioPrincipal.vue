<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="informe a tarefa que vai iniciar"
                v-model="descricao" />

            </div>
            <div class="column">
                <TemporizadorTarefa @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import TemporizadorTarefa from './TemporizadorTarefa.vue';

export default {
    components: {
        TemporizadorTarefa
    }, 
    data (){
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number) : void{
            console.log('emitiu')
            //new ITarefa
            this.$emit('aoSalvarTarefa',  {
                duracaoEmSegundos: tempoDecorrido,
                texto: this.descricao
            })
            console.log(tempoDecorrido, this.descricao)
            this.descricao = '';
        }
    },
    emits: [
        'aoSalvarTarefa'
    ]
}
</script>

<style>

.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>