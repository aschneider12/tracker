<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao }}
        </button>
    </header>
</template>

<script lang="ts">

export default {

    data(){
        return {
            modoEscuroAtivo: false
        }
    },
    methods:{
        alterarTema(){
            this.modoEscuroAtivo = !this.modoEscuroAtivo;
            this.$emit('aoAlterarTema', this.modoEscuroAtivo);
        }
    },
    computed: {
        textoBotao(){
            if(this.modoEscuroAtivo){
                return "Desativar modo escuro"
            } else {
                return "Ativar modo escuro"
            }
        }
    },
    emits: [
        'aoAlterarTema'
    ]

}
</script>

<style scoped>
header {
    background: #0d3b66;
    padding: 1rem;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>