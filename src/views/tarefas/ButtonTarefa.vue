<template>

    <button class="button" @click="clicado" :disabled="disabled">
        <span> <i :class="icon"></i></span>
        <span>{{ text }}</span>
    </button>

</template>

<script lang="ts">
export default {

    props: {
        icon: { type: String, required: true },
        text: { type: String, required: true },
        disabled: { type: Boolean }
    },
    methods: {
        clicado() {
            this.$emit('btnClicado');
        }
    },
    emits: [
        'btnClicado'
    ]
}
</script>
<style scoped>

span {
    margin: 3px;
}

</style>