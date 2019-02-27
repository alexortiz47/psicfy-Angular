import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { Error404Component } from './error404/error404.component';
import { CercaComponent } from './cerca/cerca.component';
import { LogeadoComponent } from './logeado/logeado.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMainComponent } from './admin-main/admin-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: MainPrincipalComponent},
  { path: 'evaluate', component: EvaluateComponent},
  { path: 'resultado', component: ResultadoComponent},
  { path: 'buscar', component: CercaComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: InicioSesionComponent},
  { path: 'logeado', component: LogeadoComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin/inicio', component: AdminMainComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
