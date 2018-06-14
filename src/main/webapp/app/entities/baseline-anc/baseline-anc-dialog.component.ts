import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BaselineAnc } from './baseline-anc.model';
import { BaselineAncPopupService } from './baseline-anc-popup.service';
import { BaselineAncService } from './baseline-anc.service';
import { FileEntryAnc, FileEntryAncService } from '../file-entry-anc';

@Component({
    selector: 'jhi-baseline-anc-dialog',
    templateUrl: './baseline-anc-dialog.component.html'
})
export class BaselineAncDialogComponent implements OnInit {

    baseline: BaselineAnc;
    isSaving: boolean;

    fileentries: FileEntryAnc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private baselineService: BaselineAncService,
        private fileEntryService: FileEntryAncService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fileEntryService.query()
            .subscribe((res: HttpResponse<FileEntryAnc[]>) => { this.fileentries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.baseline.id !== undefined) {
            this.subscribeToSaveResponse(
                this.baselineService.update(this.baseline));
        } else {
            this.subscribeToSaveResponse(
                this.baselineService.create(this.baseline));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BaselineAnc>>) {
        result.subscribe((res: HttpResponse<BaselineAnc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BaselineAnc) {
        this.eventManager.broadcast({ name: 'baselineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFileEntryById(index: number, item: FileEntryAnc) {
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
    selector: 'jhi-baseline-anc-popup',
    template: ''
})
export class BaselineAncPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baselinePopupService: BaselineAncPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.baselinePopupService
                    .open(BaselineAncDialogComponent as Component, params['id']);
            } else {
                this.baselinePopupService
                    .open(BaselineAncDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
