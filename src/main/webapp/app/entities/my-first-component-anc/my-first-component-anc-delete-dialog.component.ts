import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MyFirstComponentAnc } from './my-first-component-anc.model';
import { MyFirstComponentAncPopupService } from './my-first-component-anc-popup.service';
import { MyFirstComponentAncService } from './my-first-component-anc.service';

@Component({
    selector: 'jhi-my-first-component-anc-delete-dialog',
    templateUrl: './my-first-component-anc-delete-dialog.component.html'
})
export class MyFirstComponentAncDeleteDialogComponent {

    myFirstComponent: MyFirstComponentAnc;

    constructor(
        private myFirstComponentService: MyFirstComponentAncService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.myFirstComponentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'myFirstComponentListModification',
                content: 'Deleted an myFirstComponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-my-first-component-anc-delete-popup',
    template: ''
})
export class MyFirstComponentAncDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private myFirstComponentPopupService: MyFirstComponentAncPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.myFirstComponentPopupService
                .open(MyFirstComponentAncDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
