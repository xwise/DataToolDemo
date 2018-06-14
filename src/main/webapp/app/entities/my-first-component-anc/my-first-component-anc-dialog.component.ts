import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MyFirstComponentAnc } from './my-first-component-anc.model';
import { MyFirstComponentAncPopupService } from './my-first-component-anc-popup.service';
import { MyFirstComponentAncService } from './my-first-component-anc.service';

@Component({
    selector: 'jhi-my-first-component-anc-dialog',
    templateUrl: './my-first-component-anc-dialog.component.html'
})
export class MyFirstComponentAncDialogComponent implements OnInit {

    myFirstComponent: MyFirstComponentAnc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private myFirstComponentService: MyFirstComponentAncService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.myFirstComponent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.myFirstComponentService.update(this.myFirstComponent));
        } else {
            this.subscribeToSaveResponse(
                this.myFirstComponentService.create(this.myFirstComponent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MyFirstComponentAnc>>) {
        result.subscribe((res: HttpResponse<MyFirstComponentAnc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MyFirstComponentAnc) {
        this.eventManager.broadcast({ name: 'myFirstComponentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-my-first-component-anc-popup',
    template: ''
})
export class MyFirstComponentAncPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private myFirstComponentPopupService: MyFirstComponentAncPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.myFirstComponentPopupService
                    .open(MyFirstComponentAncDialogComponent as Component, params['id']);
            } else {
                this.myFirstComponentPopupService
                    .open(MyFirstComponentAncDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
