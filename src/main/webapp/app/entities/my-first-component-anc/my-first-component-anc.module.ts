import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataToolDemoSharedModule } from '../../shared';
import {
    MyFirstComponentAncService,
    MyFirstComponentAncPopupService,
    MyFirstComponentAncComponent,
    MyFirstComponentAncDetailComponent,
    MyFirstComponentAncDialogComponent,
    MyFirstComponentAncPopupComponent,
    MyFirstComponentAncDeletePopupComponent,
    MyFirstComponentAncDeleteDialogComponent,
    myFirstComponentRoute,
    myFirstComponentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...myFirstComponentRoute,
    ...myFirstComponentPopupRoute,
];

@NgModule({
    imports: [
        DataToolDemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyFirstComponentAncComponent,
        MyFirstComponentAncDetailComponent,
        MyFirstComponentAncDialogComponent,
        MyFirstComponentAncDeleteDialogComponent,
        MyFirstComponentAncPopupComponent,
        MyFirstComponentAncDeletePopupComponent,
    ],
    entryComponents: [
        MyFirstComponentAncComponent,
        MyFirstComponentAncDialogComponent,
        MyFirstComponentAncPopupComponent,
        MyFirstComponentAncDeleteDialogComponent,
        MyFirstComponentAncDeletePopupComponent,
    ],
    providers: [
        MyFirstComponentAncService,
        MyFirstComponentAncPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataToolDemoMyFirstComponentAncModule {}
