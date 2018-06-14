/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataToolDemoTestModule } from '../../../test.module';
import { MyFirstComponentAncDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc-delete-dialog.component';
import { MyFirstComponentAncService } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.service';

describe('Component Tests', () => {

    describe('MyFirstComponentAnc Management Delete Component', () => {
        let comp: MyFirstComponentAncDeleteDialogComponent;
        let fixture: ComponentFixture<MyFirstComponentAncDeleteDialogComponent>;
        let service: MyFirstComponentAncService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [MyFirstComponentAncDeleteDialogComponent],
                providers: [
                    MyFirstComponentAncService
                ]
            })
            .overrideTemplate(MyFirstComponentAncDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MyFirstComponentAncDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyFirstComponentAncService);
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
