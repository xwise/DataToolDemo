import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataToolDemoSharedModule } from '../../shared';
import {
    BaselineAncService,
    BaselineAncPopupService,
    BaselineAncComponent,
    BaselineAncDetailComponent,
    BaselineAncDialogComponent,
    BaselineAncPopupComponent,
    BaselineAncDeletePopupComponent,
    BaselineAncDeleteDialogComponent,
    baselineRoute,
    baselinePopupRoute,
    BaselineAncResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...baselineRoute,
    ...baselinePopupRoute,
];

@NgModule({
    imports: [
        DataToolDemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BaselineAncComponent,
        BaselineAncDetailComponent,
        BaselineAncDialogComponent,
        BaselineAncDeleteDialogComponent,
        BaselineAncPopupComponent,
        BaselineAncDeletePopupComponent,
    ],
    entryComponents: [
        BaselineAncComponent,
        BaselineAncDialogComponent,
        BaselineAncPopupComponent,
        BaselineAncDeleteDialogComponent,
        BaselineAncDeletePopupComponent,
    ],
    providers: [
        BaselineAncService,
        BaselineAncPopupService,
        BaselineAncResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataToolDemoBaselineAncModule {}
