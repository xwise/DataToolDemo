/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataToolDemoTestModule } from '../../../test.module';
import { MyFirstComponentAncDialogComponent } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc-dialog.component';
import { MyFirstComponentAncService } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.service';
import { MyFirstComponentAnc } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.model';

describe('Component Tests', () => {

    describe('MyFirstComponentAnc Management Dialog Component', () => {
        let comp: MyFirstComponentAncDialogComponent;
        let fixture: ComponentFixture<MyFirstComponentAncDialogComponent>;
        let service: MyFirstComponentAncService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [MyFirstComponentAncDialogComponent],
                providers: [
                    MyFirstComponentAncService
                ]
            })
            .overrideTemplate(MyFirstComponentAncDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MyFirstComponentAncDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyFirstComponentAncService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MyFirstComponentAnc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.myFirstComponent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'myFirstComponentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MyFirstComponentAnc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.myFirstComponent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'myFirstComponentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
