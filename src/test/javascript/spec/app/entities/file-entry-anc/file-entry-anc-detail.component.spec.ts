/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataToolDemoTestModule } from '../../../test.module';
import { FileEntryAncDetailComponent } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc-detail.component';
import { FileEntryAncService } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.service';
import { FileEntryAnc } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.model';

describe('Component Tests', () => {

    describe('FileEntryAnc Management Detail Component', () => {
        let comp: FileEntryAncDetailComponent;
        let fixture: ComponentFixture<FileEntryAncDetailComponent>;
        let service: FileEntryAncService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [FileEntryAncDetailComponent],
                providers: [
                    FileEntryAncService
                ]
            })
            .overrideTemplate(FileEntryAncDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileEntryAncDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileEntryAncService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FileEntryAnc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fileEntry).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
