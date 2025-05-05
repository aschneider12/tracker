<template>

  <FormularioPrincipal :onAoSalvarTarefa="salvarTarefa" />

  <div class="field">
      <p class="control has-icons-left">
          <input type="text" class="input" placeholder="digite aqui sua busca localmente, sem api"
              v-model="filtroPesquisa">
          <span class="icon is--small is-left">
              <i class="fas fa-search"></i>
          </span>
      </p>
  </div>

  <ListaTarefas :tarefas="tarefas" />

</template>

<script lang="ts">

import FormularioPrincipal from '@/views/tarefas/FormularioPrincipal.vue';
import ListaTarefas from '@/views/tarefas/ListaTarefas.vue';
import type ITarefa from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { computed, ref, watchEffect } from 'vue';
import { ACT_CADASTRAR_TAREFA, ACT_OBTER_TAREFAS, OBTER_PROJETOS } from '@/store/TipoAcoes';

export default {
  components: {
    FormularioPrincipal,
    ListaTarefas
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {

      this.store.dispatch(ACT_CADASTRAR_TAREFA, tarefa);
    }
  },
  setup() {
        
    const filtroPesquisa = ref("")

    const store = useStore()
    store.dispatch(ACT_OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const tarefas = computed(() => 
          store.state.tarefa.tarefas.filter(t => !filtroPesquisa.value || t.texto.includes(filtroPesquisa.value))
    )

    return {
        store,
        filtroPesquisa,
        tarefas 
    }
  }
}
</script>

<style scoped></style>