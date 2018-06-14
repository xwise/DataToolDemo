/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataToolDemoTestModule } from '../../../test.module';
import { BaselineAncDetailComponent } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc-detail.component';
import { BaselineAncService } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.service';
import { BaselineAnc } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.model';

describe('Component Tests', () => {

    describe('BaselineAnc Management Detail Component', () => {
        let comp: BaselineAncDetailComponent;
        let fixture: ComponentFixture<BaselineAncDetailComponent>;
        let service: BaselineAncService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [BaselineAncDetailComponent],
                providers: [
                    BaselineAncService
                ]
            })
            .overrideTemplate(BaselineAncDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaselineAncDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaselineAncService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BaselineAnc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.baseline).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
