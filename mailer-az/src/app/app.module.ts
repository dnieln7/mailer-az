import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {SendEmailComponent} from './send-email/send-email.component';
import {FormsModule} from '@angular/forms';
import {EmailService} from './service/email.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastService} from './service/toast.service';
import {ToastsContainerComponent} from './bootstrap/toasts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    SendEmailComponent,
    ToastsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmailService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
