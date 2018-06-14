/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataToolDemoTestModule } from '../../../test.module';
import { BaselineAncDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc-delete-dialog.component';
import { BaselineAncService } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.service';

describe('Component Tests', () => {

    describe('BaselineAnc Management Delete Component', () => {
        let comp: BaselineAncDeleteDialogComponent;
        let fixture: ComponentFixture<BaselineAncDeleteDialogComponent>;
        let service: BaselineAncService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [BaselineAncDeleteDialogComponent],
                providers: [
                    BaselineAncService
                ]
            })
            .overrideTemplate(BaselineAncDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaselineAncDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaselineAncService);
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
