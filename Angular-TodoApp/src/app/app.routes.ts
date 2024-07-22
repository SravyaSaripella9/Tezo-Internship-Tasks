import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveTaskComponent } from './components/active-task/active-task.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';
import { PendingTaskComponent } from './components/pending-task/pending-task.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: PublicLayoutComponent,
                children: [
                    {
                        path: 'signin',
                        component: SignInComponent
                    },
                    {
                        path: 'signup',
                        component: SignUpComponent
                    },
                    {
                        path: '',
                        redirectTo: 'signin',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: '',
                component: MainLayoutComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                    {
                        path: 'active',
                        component: ActiveTaskComponent
                    },
                    {
                        path: 'completed',
                        component: CompletedTaskComponent
                    },
                    {
                        path: 'pending',
                        component: PendingTaskComponent
                    }
                ]
            }
        ]
    }
];
