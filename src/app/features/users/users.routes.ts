import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';
import { UserDetails } from './pages/user-details/user-details';

export const USER_ROUTES: Routes = [
    { path: '', component: UsersList },
    { path: ':id', component: UserDetails }
];