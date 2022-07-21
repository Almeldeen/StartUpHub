import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';


export const profileRoutes: Route[] = [

    {
        path     : 'company',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
        data: {
            layout: 'modern',
        },
        canActivate: [AuthGuard],
        
    },
    {
        path     : 'intern',
        loadChildren: () => import('./intern/intern.module').then(m => m.InternModule),
        data: {
            layout: 'modern',
        },
        canActivate: [AuthGuard],
    },
];
