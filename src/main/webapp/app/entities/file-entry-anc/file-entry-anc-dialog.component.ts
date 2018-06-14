import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { FileEntryAnc } from './file-entry-anc.model';
import { FileEntryAncPopupService } from './file-entry-anc-popup.service';
import { FileEntryAncService } from './file-entry-anc.service';
import { BaselineAnc, BaselineAncService } from '../baseline-anc';

@Component({
    selector: 'jhi-file-entry-anc-dialog',
    templateUrl: './file-entry-anc-dialog.component.html'
})
export class FileEntryAncDialogComponent implements OnInit {

    fileEntry: FileEntryAnc;
    isSaving: boolean;

    baselines: BaselineAnc[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private fileEntryService: FileEntryAncService,
        private baselineService: BaselineAncService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.baselineService.query()
            .subscribe((res: HttpResponse<BaselineAnc[]>) => { this.baselines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fileEntry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fileEntryService.update(this.fileEntry));
        } else {
            this.subscribeToSaveResponse(
                this.fileEntryService.create(this.fileEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FileEntryAnc>>) {
        result.subscribe((res: HttpResponse<FileEntryAnc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FileEntryAnc) {
        this.eventManager.broadcast({ name: 'fileEntryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBaselineById(index: number, item: BaselineAnc) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-file-entry-anc-popup',
    template: ''
})
export class FileEntryAncPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fileEntryPopupService: FileEntryAncPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fileEntryPopupService
                    .open(FileEntryAncDialogComponent as Component, params['id']);
            } else {
                this.fileEntryPopupService
                    .open(FileEntryAncDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
