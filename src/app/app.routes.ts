import { CadastroClientePageComponent } from './pages/cadastro-cliente/cadastro-cliente.page';
import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ClientePage } from './pages/cliente/cliente.page';
import { GerenciarClientePageComponent } from './pages/gerenciar-cliente/gerenciar-cliente.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full', // Garante que a rota corresponda apenas à raiz
  },
  {
    path: 'cliente',
    component: ClientePage,
  },
  {
    path: 'cliente/:id',
    component: GerenciarClientePageComponent
  },
  {
    path: 'cadastro-cliente',
    component: CadastroClientePageComponent,
  },
];
