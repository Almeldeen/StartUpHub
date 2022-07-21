import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject } from 'rxjs';
import { FuseNavigationItem } from 'theme/components/navigation/public-api';
import { horizontalNavigation } from './data';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private readonly _compactNavigation: FuseNavigationItem[] = horizontalNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = horizontalNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = horizontalNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this.get();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get() {
        this._navigation.next({
            compact: this._compactNavigation,
            default: this._defaultNavigation,
            futuristic: this._futuristicNavigation,
            horizontal: this._horizontalNavigation
        })
    }
}
