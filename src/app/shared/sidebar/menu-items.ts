import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/notif',
    title: 'Notificaties',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/events',
    title: 'Evenementen',
    icon: 'bi bi-calendar',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/groups',
    title: 'Groepen',
    icon: 'bi bi-hdd-stack',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/manageUser',
    title: 'Beheer gebruikers',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
];
