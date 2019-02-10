import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { Error404Component } from './error404/error404.component';
import { CercaComponent } from './cerca/cerca.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPrincipalComponent},
  { path: 'evaluate', component: EvaluateComponent},
  { path: 'cerca', component: CercaComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: InicioSesionComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
