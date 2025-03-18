<template>

    <div class="notificacoes">
        <article class="message"
        :class="contexto[ntf.tipo]"
        v-for="ntf in notificacoes" :key="ntf.id">
            <div class="message-header">
                {{ ntf.titulo }}
            </div>
            <div class="message-body">
                {{ntf.texto }}
            </div>
        </article>
    </div>

</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default {
    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCCESS] : 'is-success',
                [TipoNotificacao.WARN] : 'is-warning',
                [TipoNotificacao.ERROR] : 'is-danger'
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
}

</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>