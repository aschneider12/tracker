<template>
    <div class="lista has-text-weight-bold">

        <BoxTarefa v-if="tarefas.length == 0">
            Ainda não tem tarefa, vai trabalha vagabundo!
        </BoxTarefa>
       
        <TarefaCronometrada v-for="(t, index) in tarefas" v-bind:key="index" :tarefa="t"
          @aoClicarNaTarefa="aoSelecionarTarefa"
        ></TarefaCronometrada>

        <ModalTarefa :tarefaSelecionada="tarefaSelecionada" @fechar-tarefa="limparTarefa"></ModalTarefa>
    </div>
</template>
<script lang="ts">

import type ITarefa from '@/interfaces/ITarefa';
import TarefaCronometrada from '@/views/tarefas/TarefaCronometrada.vue';
import BoxTarefa from '@/views/tarefas/BoxTarefa.vue';
import { computed, ref, type PropType } from 'vue';
import ModalTarefa from './ModalTarefa.vue';

export default {
    props: {
        tarefas: { type: Array as PropType<ITarefa[]>, required: true } //usando quando tem um tipo de objeto especifico
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    components: {
        TarefaCronometrada,
        BoxTarefa,
        ModalTarefa
    },
    methods: {
        aoSelecionarTarefa(tarefa: ITarefa) : void {
            this.tarefaSelecionada = tarefa;
        },
        limparTarefa() {
            console.log(this.tarefaSelecionada)
            this.tarefaSelecionada = null;
        }
    },
    // setup(props) {
        // const filtroPesquisa = ref("")
        
       

        // return  {
        //     filtroPesquisa, 
        //     tarefasSelecionadas
        // }
    // }
}
</script>
<style scoped>
.lista {
    padding: 1.25rem;
}
</style>