<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    data(){
        return {
            estilos: {
                background: '#FAF0CA'
                //se for composto o estilo pod passar camelCase, ambos serão entendidos
                //backgroundColor : 
                //ou
                //'background-color' :
            }
        }
    }

}

</script>

<style scoped>
.box {
    background: #e1e1e6;
}
</style>