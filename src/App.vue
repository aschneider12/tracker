<template>

  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoAlterarTema="alterarTemaApp" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioPrincipal :onAoSalvarTarefa="salvarTarefa" />
      <ListaTarefas :tarefas="tarefas" />
    </div>
  </main>

</template>

<script setup lang="ts">

import BarraLateral from './components/BarraLateral.vue';
import FormularioPrincipal from './components/FormularioPrincipal.vue';
import ListaTarefas from './components/ListaTarefas.vue';
import type ITarefa from './interfaces/ITarefa';

</script>

<script lang="ts">

export default {
  methods: {
    salvarTarefa(tarefa: ITarefa) {

      console.log('salvandoTarefa', tarefa)
      this.tarefas.push(tarefa);
    },
    alterarTemaApp(modoEscuroAtivo: boolean) {
      //console.log(modoEscuroAtivo)
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
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
