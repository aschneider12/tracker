import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import TarefasView from '@/views/tarefas/TarefasView.vue';
import ProjetosView from "@/views/projetos/ProjetosView.vue";
import ProjetoFormulario from "@/views/projetos/ProjetoFormulario.vue";
import ProjetoLista from "@/views/projetos/ProjetoLista.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'Tarefas',
        component: TarefasView
    },
    {
        path: '/projetos',
        component : ProjetosView,
        children: [
            {
                path: "",
                name: 'Projetos',
                component: ProjetoLista
            },
            {
                path: "novo",
                name: 'Novo projeto',
                component: ProjetoFormulario
            },
            {
                path: ":id",
                name: 'Editar projeto',
                component: ProjetoFormulario,
                props: true
            }
        ]
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;