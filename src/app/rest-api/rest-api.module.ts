import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RestApiPlatformService} from './rest-api-platform.service';
import {PlatformConfig} from './platform-config';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [],
    providers: [
        HttpClient,
        RestApiPlatformService
    ]
})
export class RestApiModule {
  static forRoot(config: PlatformConfig): ModuleWithProviders {
    return {
      ngModule: RestApiModule,
      providers: [
        RestApiPlatformService,
        {provide: 'platformConfig', useValue: config}
      ]
    };
  }
}


