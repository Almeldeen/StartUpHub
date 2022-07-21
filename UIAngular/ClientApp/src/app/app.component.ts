import { AfterViewInit, Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { FuseConfigService } from 'theme/services/config';
import { Scheme } from './core/config/app.config';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements AfterViewInit
{
    /**
     * Constructor
     */
    constructor(
        private localhost: LocalStorageService,
        private _fuseConfigService: FuseConfigService,
    )
    {

    }

    ngAfterViewInit(): void {
        const theme = this.localhost.retrieve('theme');
        if(theme){
            this.setScheme(theme);
        }
       
    }
    setScheme(scheme: Scheme): void {
        this._fuseConfigService.config = { scheme };
        this.localhost.store('theme', scheme);
    }
}
