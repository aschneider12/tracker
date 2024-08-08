<template>
    <div class="lista has-text-weight-bold">

        <BoxTarefa v-if="tarefas.length == 0">
            Ainda não tem tarefa, trabalha vagabundo
        </BoxTarefa>

        <TarefaCronometrada v-for="(t, index) in tarefas" v-bind:key="index" :tarefa="t"></TarefaCronometrada>
    </div>
</template>
<script lang="ts">

import type ITarefa from '@/interfaces/ITarefa';
import TarefaCronometrada from './TarefaCronometrada.vue';
import type { PropType } from 'vue';
import BoxTarefa from './BoxTarefa.vue';

export default {
    props: {
        tarefas: { type: Array as PropType<ITarefa[]>, required: true } //usando quando tem um tipo de objeto especifico
    },
    components: {
        TarefaCronometrada,
        BoxTarefa
    },
    data() {
        return {
            tarefass: [] as ITarefa[]
        }
    }
}
</script>
<style scoped>
.lista {
    padding: 1.25rem;
}
</style>