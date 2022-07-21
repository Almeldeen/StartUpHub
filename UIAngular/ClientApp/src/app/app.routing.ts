import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { ROLES } from './app-constants';
import { RedirectComponent } from './layout/redirect/redirect.component';
import { PublicRoutes } from './shared/routes/public-routes';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: PublicRoutes.home },

    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'redirect' },

    // redirect component
    {
        path: 'redirect',
        component: RedirectComponent,
        data: {
            layout: 'empty'
        },
    },
    // public
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: PublicRoutes.confirmationRequired, loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: PublicRoutes.forgotPassword, loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: PublicRoutes.resetPassword, loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: PublicRoutes.login, loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: PublicRoutes.signUp, loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: PublicRoutes.signOut, loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: PublicRoutes.confirm, loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        data: {
            layout: 'modern'
        },
        children: [
            { path: PublicRoutes.home, loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.HomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
           
        },
        children: [
            { path: '', loadChildren: () => import('app/modules/admin/admin.module').then(m => m.AdminModule) },
        ]
    },
    // intern routes
    {
        path: 'intern',
        canActivate: [AuthGuard],
        data: {
            layout: 'modern',
            authorities: [ROLES.INTERN]
        },

        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/intern/intern.module').then(m => m.InternModule)
    },
    // startup routes
    {
        path: 'company',
        data: {
            layout: 'modern',
            authorities: [ROLES.COMPANY]

        },
        canActivate: [AuthGuard],

        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/startup/startup.module').then(m => m.StartupModule)
    },
    //shared routes
    {
        path: 'people',
        data: {
            layout: 'modern'
        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/search-people/search-people.module').then(m => m.SearchPeopleModule)
    },
    {
        path: 'job-details/:id',
        data: {
            layout: 'modern',

        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/job-details/job-details.module').then(m => m.JobDetailsModule)
    },
    {
        path: 'search-jobs',
        data: {
            layout: 'modern'
        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/search-jobs/search-jobs.module').then(m => m.SearchJobsModule)
    },
    {
        path: 'post/:postId',
        data: {
            layout: 'modern'
        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/post-details/post-details.module').then(m => m.PostDetailsModule)
    },
    // profile route
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
    },
    // timeline route
    {
        path: 'timeline',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/timeline/timeline.module').then(m => m.TimelineModule),
        data: {
            layout: 'modern',
            authorities: [ROLES.INTERN, ROLES.COMPANY]

        }
    },
    {
        path: 'job-request/:id',
        data: {
            layout: 'modern'
        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/request-details/request-details.module').then(m => m.RequestDetailsModule)
    },
    {
        path: 'requested-internships',
        data: {
            layout: 'modern'
        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/requested-internships/requested-internships.module').then(m => m.RequestedInternshipsModule)
    },
    {
        path: 'chat',
        data: {
            layout: 'modern'
        },
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
           
        },
        loadChildren: () => import('app/modules/chat/chat.module').then(m => m.ChatModule)
    },
    {
        path: '403',
        loadChildren: () => import('app/modules/error/error-500/error-500.module').then(m => m.Error500Module)
    },
    // 404 route
    {
        path: '**',
        redirectTo: '/404',
    },
    {
        path: '404',
        loadChildren: () => import('app/modules/error/error-404/error-404.module').then(m => m.Error404Module)
    }
];
