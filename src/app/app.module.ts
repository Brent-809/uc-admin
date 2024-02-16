import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './pages/login/login.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { CreateComponent } from './pages/groups/create/create.component';
import { UploaderModule } from 'angular-uploader';
import { ManageComponent } from './pages/groups/manage/manage.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { EventsComponent } from './pages/events/events.component';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { EventsManageComponent } from './pages/events/manage/manage.component';
import { CreateEventsComponent } from './pages/events/create/create.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { environment } from 'src/environments/environment';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    GroupsComponent,
    CreateComponent,
    ManageComponent,
    EventsComponent,
    CreateEventsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    UploaderModule,
    DropzoneModule,
    DataTableModule,
    EventsManageComponent,
    GeoapifyGeocoderAutocompleteModule.withConfig(environment.geoApifyKey),
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
