/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxCarouselModule } from 'ngx-carousel';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'

//Auth
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth-service.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RequestPasswordComponent } from './auth/request-password/request-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { environment } from '../environments/environment';
import { DropzoneDirective } from './@theme/directives/dropzone.directive';
import { NotificationService } from './@core/data/notification.service';
import { NotificationComponent } from './@core/notification/notification.component';

import { AngularFireStorage } from 'angularfire2/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { FirestoreProvider } from './@core/data/firestore.service';
import { Connection } from '@angular/http';
import { VoterComponent } from './pages/voter/voter.component';
// import { ChartjsPieComponent } from './pages/charts/chartjs/chartjs-pie.component';



export const firebaseConfig = {
  // TODO fill api key
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent, 
    RequestPasswordComponent, 
    ResetPasswordComponent, VoterComponent,
    // ChartjsPieComponent,
   // NotificationComponent
   // DropzoneDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
    

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard, AuthService, NotificationService, FirestoreProvider
  ],
})
export class AppModule {
}
