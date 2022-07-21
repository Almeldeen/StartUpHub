import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CompanyModule } from './company/company.module';
import { InternModule } from './intern/intern.module';
import { profileRoutes } from './profile.routing';


@NgModule({
    declarations: [  
  ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        MatIconModule,
        CompanyModule,
        InternModule,
        MatButtonModule,
        MatInputModule,
        MatMenuModule,
        MatDividerModule,
        MatFormFieldModule,
        MatTooltipModule,
        SharedModule
    ]
})
export class ProfileModule
{
}
