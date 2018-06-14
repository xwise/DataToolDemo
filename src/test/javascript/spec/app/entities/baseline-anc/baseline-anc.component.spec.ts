/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataToolDemoTestModule } from '../../../test.module';
import { BaselineAncComponent } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.component';
import { BaselineAncService } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.service';
import { BaselineAnc } from '../../../../../../main/webapp/app/entities/baseline-anc/baseline-anc.model';

describe('Component Tests', () => {

    describe('BaselineAnc Management Component', () => {
        let comp: BaselineAncComponent;
        let fixture: ComponentFixture<BaselineAncComponent>;
        let service: BaselineAncService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [BaselineAncComponent],
                providers: [
                    BaselineAncService
                ]
            })
            .overrideTemplate(BaselineAncComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaselineAncComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaselineAncService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BaselineAnc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.baselines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
