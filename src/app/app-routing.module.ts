import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GroupsComponent } from './pages/groups/groups.component';
import { CreateComponent } from './pages/groups/create/create.component';
import { ManageComponent } from './pages/groups/manage/manage.component';
import { EventsManageComponent } from './pages/events/manage/manage.component';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventsComponent } from './pages/events/create/create.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'event/manage/:id',
        component: EventsManageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'event/create',
        component: CreateEventsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-group',
        component: CreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage/:id',
        component: ManageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then(
            (m) => m.ComponentsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
