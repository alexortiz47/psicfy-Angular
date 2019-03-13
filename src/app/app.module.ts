import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { FooterComponent } from './footer/footer.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { Error404Component } from './error404/error404.component';
import { CercaComponent } from './cerca/cerca.component';
import { LogeadoComponent } from './logeado/logeado.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { AdminComponent } from './admin/admin.component';
import { environment } from 'src/environments/environment';
import { PsicoCardComponent } from './psico-card/psico-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPrincipalComponent,
    FooterComponent,
    EvaluateComponent,
    RegistroComponent,
    InicioSesionComponent,
    Error404Component,
    CercaComponent,
    LogeadoComponent,
    PreguntaComponent,
    AdminComponent,
    PsicoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
