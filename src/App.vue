<template>

  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">

    <div class="column is-one-quarter">
      <BarraLateral @aoAlterarTema="alterarTemaApp" />
    </div>

    <div class="column is-three-quarter conteudo">
      <NotificacaoGlobal />
      <RouterView />
      <!--esse cara indica onde o router vai renderizar o comnponente-->
    </div>
  </main>

</template>

<script setup lang="ts">

import BarraLateral from '@/components/BarraLateral.vue';
import NotificacaoGlobal from '@/components/NotificacaoGlobal.vue';

</script>

<script lang="ts">

export default {
  methods: {
    alterarTemaApp(modoEscuroAtivo: boolean) {
      //console.log(modoEscuroAtivo)
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  },
  data() {
    return {
      modoEscuroAtivo: false
    }
  }
}
</script>

<style scoped>
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario)
}
</style>
