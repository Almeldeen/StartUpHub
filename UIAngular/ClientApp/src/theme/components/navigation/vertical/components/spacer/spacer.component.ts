import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from 'theme/components/navigation/navigation.service';
import { FuseNavigationItem } from 'theme/components/navigation/navigation.types';
import { FuseVerticalNavigationComponent } from 'theme/components/navigation/vertical/vertical.component';

@Component({
    selector       : 'fuse-vertical-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseVerticalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: FuseNavigationItem;
    @Input() name: string;

    private _fuseVerticalNavigationComponent: FuseVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._fuseVerticalNavigationComponent = this._fuseNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._fuseVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
