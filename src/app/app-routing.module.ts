import { authGuard } from './shared/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, title: 'Minas Tirith',
    children: [
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: 'cofres', title: 'Cofres - Minas Tirith',
        loadChildren: () =>
          import('./cofres/cofres.module').then((m) => m.CofresModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  { path: 'login', component: LoginComponent, title: 'Login - Minas Tirith' },
  { path: '**', component: PathNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
