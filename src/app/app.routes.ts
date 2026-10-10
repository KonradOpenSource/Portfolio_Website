import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
