import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingupComponent } from './components/signup/singup.component';
import { AngularMaterialModule } from './components/angular-material/angular-material.module';
import { ClientsComponent } from './components/clients/clients.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { GenerateUserComponent } from './components/generate-user/generate-user.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { MessageConfirmationComponent } from './components/message-confirmation/message-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    ClientsComponent,
    NabvarComponent,
    GenerateUserComponent,
    EditClientComponent,
    MessageConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
