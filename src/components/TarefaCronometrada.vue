<template>
    <BoxTarefa>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.texto || 'Tarefa sem descrição'}}
            </div>
            <div class="column">
                <CronometroTarefa :tempo-em-segundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </BoxTarefa>

</template>
<script lang="ts">

import type ITarefa from '@/interfaces/ITarefa';
import CronometroTarefa from './CronometroTarefa.vue';
import type { PropType } from 'vue';
import BoxTarefa from './BoxTarefa.vue';

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