/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataToolDemoTestModule } from '../../../test.module';
import { FileEntryAncComponent } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.component';
import { FileEntryAncService } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.service';
import { FileEntryAnc } from '../../../../../../main/webapp/app/entities/file-entry-anc/file-entry-anc.model';

describe('Component Tests', () => {

    describe('FileEntryAnc Management Component', () => {
        let comp: FileEntryAncComponent;
        let fixture: ComponentFixture<FileEntryAncComponent>;
        let service: FileEntryAncService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataToolDemoTestModule],
                declarations: [FileEntryAncComponent],
                providers: [
                    FileEntryAncService
                ]
            })
            .overrideTemplate(FileEntryAncComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileEntryAncComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileEntryAncService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FileEntryAnc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fileEntries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
