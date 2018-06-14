import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { FileEntryAnc } from './file-entry-anc.model';
import { FileEntryAncService } from './file-entry-anc.service';

@Component({
    selector: 'jhi-file-entry-anc-detail',
    templateUrl: './file-entry-anc-detail.component.html'
})
export class FileEntryAncDetailComponent implements OnInit, OnDestroy {

    fileEntry: FileEntryAnc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private fileEntryService: FileEntryAncService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFileEntries();
    }

    load(id) {
        this.fileEntryService.find(id)
            .subscribe((fileEntryResponse: HttpResponse<FileEntryAnc>) => {
                this.fileEntry = fileEntryResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFileEntries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fileEntryListModification',
            (response) => this.load(this.fileEntry.id)
        );
    }
}
