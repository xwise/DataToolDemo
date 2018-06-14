/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataToolDemoTestModule } from '../../../test.module';
import { FileEntryAncDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc-delete-dialog.component';
import { FileEntryAncService } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.service';

describe('Component Tests', () => {

    describe('FileEntryAnc Management Delete Component', () => {
        let comp: FileEntryAncDeleteDialogComponent;
        let fixture: ComponentFixture<FileEntryAncDeleteDialogComponent>;
        let service: FileEntryAncService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [FileEntryAncDeleteDialogComponent],
                providers: [
                    FileEntryAncService
                ]
            })
            .overrideTemplate(FileEntryAncDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileEntryAncDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileEntryAncService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
