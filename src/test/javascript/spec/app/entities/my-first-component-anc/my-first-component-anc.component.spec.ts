/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataToolDemoTestModule } from '../../../test.module';
import { MyFirstComponentAncComponent } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.component';
import { MyFirstComponentAncService } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.service';
import { MyFirstComponentAnc } from '../../../../../../main/webapp/app/entities/my-first-component-anc/my-first-component-anc.model';

describe('Component Tests', () => {

    describe('MyFirstComponentAnc Management Component', () => {
        let comp: MyFirstComponentAncComponent;
        let fixture: ComponentFixture<MyFirstComponentAncComponent>;
        let service: MyFirstComponentAncService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [MyFirstComponentAncComponent],
                providers: [
                    MyFirstComponentAncService
                ]
            })
            .overrideTemplate(MyFirstComponentAncComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MyFirstComponentAncComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyFirstComponentAncService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MyFirstComponentAnc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.myFirstComponents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
