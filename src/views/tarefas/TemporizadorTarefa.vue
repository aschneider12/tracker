<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">

        <CronometroTarefa :tempoEmSegundos="tempoEmSegundos" />

        <ButtonTarefa icon="fas fa-play" text="play" 
        :disabled="cronometroRodando" @btnClicado="iniciar"/>

        <ButtonTarefa icon="fas fa-stop" text="stop" 
        :disabled="!cronometroRodando" @btnClicado="finalizar"/>
        
    </div>
</template>

<script lang="ts">

import ButtonTarefa from '@/views/tarefas/ButtonTarefa.vue';
import CronometroTarefa from '@/views/tarefas/CronometroTarefa.vue';

export default {
    components: {
        CronometroTarefa,
        ButtonTarefa
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },

    methods: {
        iniciar() {
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    },
    emits: [
        'aoTemporizadorFinalizado'
    ]
}
</script>