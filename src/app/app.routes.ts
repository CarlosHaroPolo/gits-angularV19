import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifts/pages/dashboard-page/dashboard-page.component') ,/* tienes que agregar la palbara defaul al componente */
    children:[
      {
        path: 'trending',
        loadComponent:()=>import('./gifts/pages/trending-page/trending-page.component')
      },
      {
        path: 'search',
        loadComponent:()=>import('./gifts/pages/search-page/search-page.component')
      },
      {
        path:'**',
        redirectTo:'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
