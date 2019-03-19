import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { CapitalizePipe } from './capitalize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { FiltradoComponent } from './filtrado/filtrado.component';
import { BotComponent } from './bot/bot.component';
import { QueComponent } from './que/que.component';
import { CuandoComponent } from './cuando/cuando.component';
import { InfopsicoComponent } from './infopsico/infopsico.component';


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
    PsicoCardComponent,
    FiltradoComponent,
    CapitalizePipe,
    BotComponent,
    QueComponent,
    CuandoComponent,
    InfopsicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
