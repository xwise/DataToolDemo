import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BaselineAncComponent } from './baseline-anc.component';
import { BaselineAncDetailComponent } from './baseline-anc-detail.component';
import { BaselineAncPopupComponent } from './baseline-anc-dialog.component';
import { BaselineAncDeletePopupComponent } from './baseline-anc-delete-dialog.component';

@Injectable()
export class BaselineAncResolvePagingParams implements Resolve<any> {

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

export const baselineRoute: Routes = [
    {
        path: 'baseline-anc',
        component: BaselineAncComponent,
        resolve: {
            'pagingParams': BaselineAncResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'baseline-anc/:id',
        component: BaselineAncDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const baselinePopupRoute: Routes = [
    {
        path: 'baseline-anc-new',
        component: BaselineAncPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'baseline-anc/:id/edit',
        component: BaselineAncPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'baseline-anc/:id/delete',
        component: BaselineAncDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
