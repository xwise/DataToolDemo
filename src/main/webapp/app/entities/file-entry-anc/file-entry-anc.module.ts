import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataToolDemoSharedModule } from '../../shared';
import {
    FileEntryAncService,
    FileEntryAncPopupService,
    FileEntryAncComponent,
    FileEntryAncDetailComponent,
    FileEntryAncDialogComponent,
    FileEntryAncPopupComponent,
    FileEntryAncDeletePopupComponent,
    FileEntryAncDeleteDialogComponent,
    fileEntryRoute,
    fileEntryPopupRoute,
    FileEntryAncResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fileEntryRoute,
    ...fileEntryPopupRoute,
];

@NgModule({
    imports: [
        DataToolDemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FileEntryAncComponent,
        FileEntryAncDetailComponent,
        FileEntryAncDialogComponent,
        FileEntryAncDeleteDialogComponent,
        FileEntryAncPopupComponent,
        FileEntryAncDeletePopupComponent,
    ],
    entryComponents: [
        FileEntryAncComponent,
        FileEntryAncDialogComponent,
        FileEntryAncPopupComponent,
        FileEntryAncDeleteDialogComponent,
        FileEntryAncDeletePopupComponent,
    ],
    providers: [
        FileEntryAncService,
        FileEntryAncPopupService,
        FileEntryAncResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataToolDemoFileEntryAncModule {}
