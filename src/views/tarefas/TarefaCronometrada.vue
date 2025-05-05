<template>
    <BoxTarefa>
        <div class="columns pointer" @click="tarefaClicada">
            <div class="column is-5">
                {{ tarefa.texto || 'Tarefa sem descrição'}}
            </div>
            <div class="column">
                <CronometroTarefa :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
            <div class="column is-4">
                {{ tarefa.projeto?.nome || 'N/D'  }}
            </div>
            <div class="column">
                <button class="button ml02 is-danger" @click="excluir(p.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>          
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
    emmits: [
        'aoClicarNaTarefa'
    ],
    props: {
        tarefa: {type: Object as PropType<ITarefa>, required: true} //usando quando tem um tipo de objeto especifico
    },
    components : {
        CronometroTarefa,
        BoxTarefa
    },
    methods: {
        tarefaClicada() : void{ 
            this.$emit('aoClicarNaTarefa', this.tarefa);
        }
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer
}

</style>