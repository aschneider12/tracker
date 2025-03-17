<template>

    <div class="notificacoes">
        <article class="message is-success">
            <div class="message-header">
                atencao success
            </div>
            <div class="message-body">
                aqui vai texto da notificacao
            </div>
        </article>
        <article class="message is-warning">
            <div class="message-header">
                atencao warning
            </div>
            <div class="message-body">
                aqui vai texto da notificacao
            </div>
        </article>
        <article class="message is-danger">
            <div class="message-header">
                atencao danger
            </div>
            <div class="message-body">
                aqui vai texto da notificacao
            </div>
        </article>
    </div>

</template>

<script lang="ts">
export default {

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