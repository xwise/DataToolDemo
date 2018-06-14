import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BaselineAnc } from './baseline-anc.model';
import { BaselineAncPopupService } from './baseline-anc-popup.service';
import { BaselineAncService } from './baseline-anc.service';

@Component({
    selector: 'jhi-baseline-anc-delete-dialog',
    templateUrl: './baseline-anc-delete-dialog.component.html'
})
export class BaselineAncDeleteDialogComponent {

    baseline: BaselineAnc;

    constructor(
        private baselineService: BaselineAncService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.baselineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'baselineListModification',
                content: 'Deleted an baseline'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-baseline-anc-delete-popup',
    template: ''
})
export class BaselineAncDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baselinePopupService: BaselineAncPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.baselinePopupService
                .open(BaselineAncDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
