import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FileEntryAnc } from './file-entry-anc.model';
import { FileEntryAncPopupService } from './file-entry-anc-popup.service';
import { FileEntryAncService } from './file-entry-anc.service';

@Component({
    selector: 'jhi-file-entry-anc-delete-dialog',
    templateUrl: './file-entry-anc-delete-dialog.component.html'
})
export class FileEntryAncDeleteDialogComponent {

    fileEntry: FileEntryAnc;

    constructor(
        private fileEntryService: FileEntryAncService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fileEntryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fileEntryListModification',
                content: 'Deleted an fileEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-file-entry-anc-delete-popup',
    template: ''
})
export class FileEntryAncDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fileEntryPopupService: FileEntryAncPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fileEntryPopupService
                .open(FileEntryAncDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
