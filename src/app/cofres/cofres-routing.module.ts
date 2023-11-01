import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCofresComponent } from './listagem-cofres/listagem-cofres.component';
import { SalvarCofreComponent } from './salvar-cofre/salvar-cofre.component';
import { SalvarTransacaoComponent } from './salvar-transacao/salvar-transacao.component';

const routes: Routes = [
  { path: '', component: ListagemCofresComponent },
  { path: 'novo', component: SalvarCofreComponent },
  {
    path: ':id', component: SalvarCofreComponent,
    children: [
      { path: 'transacao/:id', component: SalvarTransacaoComponent, },
      { path: 'transacao/nova/:moeda', component: SalvarTransacaoComponent, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CofresRoutingModule {}
