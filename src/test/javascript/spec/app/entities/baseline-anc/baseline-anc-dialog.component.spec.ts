/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataToolDemoTestModule } from '../../../test.module';
import { BaselineAncDialogComponent } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc-dialog.component';
import { BaselineAncService } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.service';
import { BaselineAnc } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.model';
import { FileEntryAncService } from '../../../../../../main/webapp/app/entities/file-entry-anc';

describe('Component Tests', () => {

    describe('BaselineAnc Management Dialog Component', () => {
        let comp: BaselineAncDialogComponent;
        let fixture: ComponentFixture<BaselineAncDialogComponent>;
        let service: BaselineAncService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [BaselineAncDialogComponent],
                providers: [
                    FileEntryAncService,
                    BaselineAncService
                ]
            })
            .overrideTemplate(BaselineAncDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaselineAncDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaselineAncService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BaselineAnc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.baseline = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'baselineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BaselineAnc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.baseline = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'baselineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
