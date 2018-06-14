/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataToolDemoTestModule } from '../../../test.module';
import { FileEntryAncDialogComponent } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc-dialog.component';
import { FileEntryAncService } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.service';
import { FileEntryAnc } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.model';
import { BaselineAncService } from '../../../../../../main/webapp/app/entities/baseline-anc';

describe('Component Tests', () => {

    describe('FileEntryAnc Management Dialog Component', () => {
        let comp: FileEntryAncDialogComponent;
        let fixture: ComponentFixture<FileEntryAncDialogComponent>;
        let service: FileEntryAncService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [FileEntryAncDialogComponent],
                providers: [
                    BaselineAncService,
                    FileEntryAncService
                ]
            })
            .overrideTemplate(FileEntryAncDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileEntryAncDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileEntryAncService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FileEntryAnc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.fileEntry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fileEntryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FileEntryAnc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.fileEntry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fileEntryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
