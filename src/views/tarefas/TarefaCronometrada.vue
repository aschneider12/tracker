<template>
    <BoxTarefa>
        <div class="columns">
            <div class="column is-5">
                {{ tarefa.texto || 'Tarefa sem descrição'}}
            </div>
            <div class="column">
                <CronometroTarefa :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
            <div class="column is-4">
                {{ tarefa.projeto?.nome || 'N/D'  }}
            </div>
        </div>
    </BoxTarefa>

</template>
<script lang="ts">

import type ITarefa from '@/interfaces/ITarefa';
import CronometroTarefa from '@/views/tarefas/CronometroTarefa.vue';
import type { PropType } from 'vue';
import BoxTarefa from '@/views/tarefas/BoxTarefa.vue';

export default {
    props: {
        tarefa: {type: Object as PropType<ITarefa>, required: true} //usando quando tem um tipo de objeto especifico
    },
    components : {
        CronometroTarefa,
        BoxTarefa
    }
}
</script>

<style scoped>

</style>