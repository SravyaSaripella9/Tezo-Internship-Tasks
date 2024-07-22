import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';

export const routes: Routes = [
    {
        path: 'employees',
        component: EmployeesComponent
    },
    {
        path: 'roles',
        component: RolesComponent
    },
    {
        path: 'role-details/:id',
        component: RoleDetailsComponent
    },
    {
        path:'',
        redirectTo:'employees',
        pathMatch:'full'
    }
];
