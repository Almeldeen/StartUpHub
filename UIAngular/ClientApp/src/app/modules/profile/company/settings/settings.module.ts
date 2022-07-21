import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FuseAlertModule } from 'theme/components/alert';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { SettingsComponent } from './settings.component';
import { settingsRoutes } from './settings.routing';

@NgModule({
    declarations: [
        SettingsComponent,
        PersonalInformationComponent,
        ChangePasswordComponent,
    ],
    imports     : [
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        NgxDropzoneModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        PdfViewerModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        MatDatepickerModule,
        MatMomentDateModule,
        SharedModule
    ]
})
export class SettingsModule
{
}
