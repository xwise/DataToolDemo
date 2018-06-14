/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataToolDemoTestModule } from '../../../test.module';
import { MyFirstComponentAncDetailComponent } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc-detail.component';
import { MyFirstComponentAncService } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.service';
import { MyFirstComponentAnc } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.model';

describe('Component Tests', () => {

    describe('MyFirstComponentAnc Management Detail Component', () => {
        let comp: MyFirstComponentAncDetailComponent;
        let fixture: ComponentFixture<MyFirstComponentAncDetailComponent>;
        let service: MyFirstComponentAncService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [MyFirstComponentAncDetailComponent],
                providers: [
                    MyFirstComponentAncService
                ]
            })
            .overrideTemplate(MyFirstComponentAncDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MyFirstComponentAncDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyFirstComponentAncService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MyFirstComponentAnc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.myFirstComponent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
