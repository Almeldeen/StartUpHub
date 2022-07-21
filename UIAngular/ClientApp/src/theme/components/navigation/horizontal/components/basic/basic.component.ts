import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { SignalRService } from 'app/signalr.service';
import { FuseHorizontalNavigationComponent } from 'theme/components/navigation/horizontal/horizontal.component';
import { FuseNavigationService } from 'theme/components/navigation/navigation.service';
import { FuseNavigationItem } from 'theme/components/navigation/navigation.types';
import { FuseUtilsService } from 'theme/services/utils/utils.service';

@Component({
    selector       : 'fuse-horizontal-navigation-basic-item',
    templateUrl    : './basic.component.html',
})
export class FuseHorizontalNavigationBasicItemComponent implements OnInit, OnDestroy
{
    @Input() item: FuseNavigationItem;
    @Input() name: string;
    unreadCountMsg = 0;
    isActiveMatchOptions: IsActiveMatchOptions;
    private _fuseHorizontalNavigationComponent: FuseHorizontalNavigationComponent;

    /**
     * Constructor
     */
    constructor(
        public signalrService: SignalRService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseUtilsService: FuseUtilsService
    )
    {
        // Set the equivalent of {exact: false} as default for active match options.
        // We are not assigning the item.isActiveMatchOptions directly to the
        // [routerLinkActiveOptions] because if it's "undefined" initially, the router
        // will throw an error and stop working.
        this.isActiveMatchOptions = this._fuseUtilsService.subsetMatchOptions;
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Set the "isActiveMatchOptions" either from item's
        // "isActiveMatchOptions" or the equivalent form of
        // item's "exactMatch" option
        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? this._fuseUtilsService.exactMatchOptions
                : this._fuseUtilsService.subsetMatchOptions;

        // Get the parent navigation component
        this._fuseHorizontalNavigationComponent = this._fuseNavigationService.getComponent(this.name);
        this.signalrService.unReadMsgsCount.subscribe(count => {
            this._changeDetectorRef.detectChanges();
            this.unreadCountMsg = count || 0;
        });
     
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
       
    }
}
