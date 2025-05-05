<template>

    <div class="box formulario">
        
         <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="informe a tarefa que vai iniciar"
                v-model="descricao" />

            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto"  @change="console.log('Selecionado:', idProjeto)" >
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.id }} - {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column is-2">
                <TemporizadorTarefa @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import TemporizadorTarefa from '@/views/tarefas/TemporizadorTarefa.vue';
import { useStore } from "@/store";
import { computed, ref } from "vue";
import { NOTIFICAR } from '@/store/TipoMutations';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import notificador from '@/hooks/notificador';

export default {
    components: {
        TemporizadorTarefa
    }, 
    data (){
        // return { foram removidos para o setup
        //     idProjeto: '',
        //     descricao: ''
        // }
    },
    methods: {
        onProjetoSelecionado() {
            console.log('Projeto selecionado:', this.idProjeto);
        }       
    },
    emits: [
        'aoSalvarTarefa'
    ],
    setup(props, {emit}) { 
        //destructor, quando usar {} ele tira somente o emit de dentro do context que e o segundo param

        const store = useStore()
        const { notificar } = notificador()
        const projetos = computed(() => store.state.projeto.projetos)
        const descricao = ref("");
        const idProjeto = ref("");

        const finalizarTarefa = (tempoDecorrido: number) : void => {
                      
          const projetoEncontrado = projetos.value.find((proj: { id: string; }) => (proj.id == idProjeto.value));
         
          if(!projetoEncontrado) { 
               store.commit(NOTIFICAR, {
                   titulo : 'Opa!',
                   texto : 'Informe o projeto',
                   tipo: TipoNotificacao.WARN
               })
               return;
           }

           //new ITarefa
           emit('aoSalvarTarefa',  {
               duracaoEmSegundos: tempoDecorrido,
               texto: descricao,
               projeto: projetoEncontrado
           })
           console.log(tempoDecorrido, descricao.value)

           notificar(TipoNotificacao.WARN, 'Salva', 'Tarefa encerrada!')
           
           descricao.value = '';
       
        }
        
        return {
            descricao, 
            idProjeto,
            notificar,
            finalizarTarefa            
        }
    
    }
    
}
</script>

<style>

.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>