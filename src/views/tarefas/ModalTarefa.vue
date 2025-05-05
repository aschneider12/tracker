<template>
    <div class="modal" :class="{ 'is-active': isActive() }" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Editar tarefa</p>
                <button class="delete" aria-label="close" @click="fecharForm()"></button>
            </header>
            <section class="modal-card-body">

                <div class="column" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="informe a tarefa que vai iniciar"
                v-model="tarefaSelecionada.texto" />

            </div>

            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success" @click="alterarTarefa()">Salvar</button>
                    <button class="button" @click="fecharForm()">Cancelar</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import type ITarefa from '@/interfaces/ITarefa'; 
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { ACT_ALTERAR_TAREFA } from '@/store/TipoAcoes';
import { ALTERAR_TAREFA } from '@/store/TipoMutations';

export default {
    emits : [
        'fecharTarefa'
    ],
    props: {
        tarefaSelecionada: { type: Object as () => ITarefa, required: false },
    },
    mixins: [
        notificacaoMixin
    ],
    methods : {
        isActive() : boolean {
            return this.tarefaSelecionada != null
        },
        fecharForm(){
            console.log('limpar')
            this.$emit('fecharTarefa');
        },
        alterarTarefa(){ 
            this.store.dispatch(ACT_ALTERAR_TAREFA, this.tarefaSelecionada).then( () => {
                this.fecharForm();
                this.notificar(TipoNotificacao.SUCCESS, 'Salva', 'Tarefa atualizada!')
            })
        }
    },
    setup() {
        const store = useStore()        
        return {
            store
        }
    }

}
</script>

<style></style>