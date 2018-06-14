import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FileEntryAncComponent } from './file-entry-anc.component';
import { FileEntryAncDetailComponent } from './file-entry-anc-detail.component';
import { FileEntryAncPopupComponent } from './file-entry-anc-dialog.component';
import { FileEntryAncDeletePopupComponent } from './file-entry-anc-delete-dialog.component';

@Injectable()
export class FileEntryAncResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const fileEntryRoute: Routes = [
    {
        path: 'file-entry-anc',
        component: FileEntryAncComponent,
        resolve: {
            'pagingParams': FileEntryAncResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileEntries'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'file-entry-anc/:id',
        component: FileEntryAncDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileEntries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fileEntryPopupRoute: Routes = [
    {
        path: 'file-entry-anc-new',
        component: FileEntryAncPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileEntries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-entry-anc/:id/edit',
        component: FileEntryAncPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileEntries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-entry-anc/:id/delete',
        component: FileEntryAncDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileEntries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
