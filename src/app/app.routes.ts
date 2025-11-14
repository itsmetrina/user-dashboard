import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadComponent: () => import('./features/users/users-layout').then(c => c.UsersLayout),
        loadChildren: () => import('./features/users/users.routes').then(r => r.USER_ROUTES)
    },
    {
        path: '', redirectTo: '/users', pathMatch: 'full'
    }
];