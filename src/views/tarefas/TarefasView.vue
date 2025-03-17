<template>

  <FormularioPrincipal :onAoSalvarTarefa="salvarTarefa" />
 
  <ListaTarefas :tarefas="tarefas" />

</template>

<script lang="ts">

import FormularioPrincipal from '@/views/tarefas/FormularioPrincipal.vue';
import ListaTarefas from '@/views/tarefas/ListaTarefas.vue';
import type ITarefa from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { ADICIONAR_TAREFA } from '@/store/TipoMutations';
import { computed } from 'vue';

export default {
  components: {
    FormularioPrincipal,
    ListaTarefas
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {

      console.log('salvandoTarefa no tarefas view', tarefa);
      this.store.commit(ADICIONAR_TAREFA, tarefa);
    }
  },
  setup() {
        const store = useStore()
        return {
            store,
            tarefas : computed( () => store.state.tarefas)
        }
    }
}
</script>

<style scoped></style>