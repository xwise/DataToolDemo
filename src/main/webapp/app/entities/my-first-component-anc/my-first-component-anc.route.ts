import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MyFirstComponentAncComponent } from './my-first-component-anc.component';
import { MyFirstComponentAncDetailComponent } from './my-first-component-anc-detail.component';
import { MyFirstComponentAncPopupComponent } from './my-first-component-anc-dialog.component';
import { MyFirstComponentAncDeletePopupComponent } from './my-first-component-anc-delete-dialog.component';

export const myFirstComponentRoute: Routes = [
    {
        path: 'my-first-component-anc',
        component: MyFirstComponentAncComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MyFirstComponents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'my-first-component-anc/:id',
        component: MyFirstComponentAncDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MyFirstComponents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const myFirstComponentPopupRoute: Routes = [
    {
        path: 'my-first-component-anc-new',
        component: MyFirstComponentAncPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MyFirstComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'my-first-component-anc/:id/edit',
        component: MyFirstComponentAncPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MyFirstComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'my-first-component-anc/:id/delete',
        component: MyFirstComponentAncDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MyFirstComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
