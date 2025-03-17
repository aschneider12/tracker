<template>
    <div class="lista has-text-weight-bold">

        <BoxTarefa v-if="tarefas.length == 0">
            Ainda não tem tarefa, vai trabalha vagabundo!
        </BoxTarefa>

        <TarefaCronometrada v-for="(t, index) in tarefas" v-bind:key="index" :tarefa="t"></TarefaCronometrada>
    </div>
</template>
<script lang="ts">

import type ITarefa from '@/interfaces/ITarefa';
import TarefaCronometrada from '@/views/tarefas/TarefaCronometrada.vue';
import BoxTarefa from '@/views/tarefas/BoxTarefa.vue';
import type { PropType } from 'vue';

export default {
    props: {
        tarefas: { type: Array as PropType<ITarefa[]>, required: true } //usando quando tem um tipo de objeto especifico
    },
    components: {
        TarefaCronometrada,
        BoxTarefa
    }
}
</script>
<style scoped>
.lista {
    padding: 1.25rem;
}
</style>