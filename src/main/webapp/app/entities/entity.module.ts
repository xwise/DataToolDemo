import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DataToolDemoBaselineAncModule } from './baseline-anc/baseline-anc.module';
import { DataToolDemoFileEntryAncModule } from './file-entry-anc/file-entry-anc.module';
import { DataToolDemoMyFirstComponentAncModule } from './my-first-component-anc/my-first-component-anc.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DataToolDemoBaselineAncModule,
        DataToolDemoFileEntryAncModule,
        DataToolDemoMyFirstComponentAncModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataToolDemoEntityModule {}
