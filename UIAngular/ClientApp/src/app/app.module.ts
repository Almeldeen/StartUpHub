import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { appConfig } from 'app/core/config/app.config';
import { CoreModule } from 'app/core/core.module';
import { LayoutModule } from 'app/layout/layout.module';
import { environment } from 'environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ThemeModule } from 'theme';
import { FuseMockApiModule } from 'theme/lib/mock-api';
import { FuseConfigModule } from 'theme/services/config';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { ApiModule } from './core/backend/api.module';
import { mockApiServices } from './mock-api';
const routerConfig: ExtraOptions = {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always'
};


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SweetAlert2Module.forRoot(),
        RouterModule.forRoot(appRoutes, routerConfig),
        NgxWebstorageModule.forRoot({ prefix: 'startuphub' }),
        ToastrModule.forRoot(),
        // Fuse, FuseConfig & FuseMockAPI
        ThemeModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        ApiModule.forRoot({ rootUrl: environment.api + '' }),
        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class AppModule {
    
}

