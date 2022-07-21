/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthService } from './services/auth.service';
import { ArticlesService } from './services/articles.service';
import { FieldsService } from './services/fields.service';
import { GeneralService } from './services/general.service';
import { CompanyService } from './services/company.service';
import { JobsService } from './services/jobs.service';
import { TimelineService } from './services/timeline.service';
import { FollowersService } from './services/followers.service';
import { SkillsService } from './services/skills.service';
import { InternService } from './services/intern.service';
import { PhotosService } from './services/photos.service';
import { NotificationsService } from './services/notifications.service';
import { ChatService } from './services/chat.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    ArticlesService,
    FieldsService,
    GeneralService,
    CompanyService,
    JobsService,
    TimelineService,
    FollowersService,
    SkillsService,
    InternService,
    PhotosService,
    NotificationsService,
    ChatService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
