import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { OccamRequesterService } from '../services/occam-requester.service';
import { NavbarComponent } from './navbar/navbar.component';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    NavbarComponent,
    DragAndDropDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatInputModule,
    FormsModule
  ],
  providers: [OccamRequesterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
