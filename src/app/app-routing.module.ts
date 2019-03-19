import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { Error404Component } from './error404/error404.component';
import { CercaComponent } from './cerca/cerca.component';
import { LogeadoComponent } from './logeado/logeado.component';
import { AdminComponent } from './admin/admin.component';
import { FiltradoComponent } from './filtrado/filtrado.component';
import { QueComponent } from './que/que.component';
import { CuandoComponent } from './cuando/cuando.component';
import { InfopsicoComponent } from './infopsico/infopsico.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: MainPrincipalComponent},
  { path: 'inicio/:numColeg', component: MainPrincipalComponent},
  { path: 'evaluate', component: EvaluateComponent},
  { path: 'buscar_localizacion', component: CercaComponent},
  { path: 'buscar_filtrado', component: FiltradoComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: InicioSesionComponent},
  { path: 'edit/:numColeg', component: LogeadoComponent},
  { path: 'que_es', component: QueComponent},
  { path: 'cuando_ir', component: CuandoComponent},
  { path: 'psico/:id', component: InfopsicoComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'error404', component: Error404Component},
  { path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
