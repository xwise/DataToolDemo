import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FileEntryAnc } from './file-entry-anc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FileEntryAnc>;

@Injectable()
export class FileEntryAncService {

    private resourceUrl =  SERVER_API_URL + 'api/file-entries';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(fileEntry: FileEntryAnc): Observable<EntityResponseType> {
        const copy = this.convert(fileEntry);
        return this.http.post<FileEntryAnc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fileEntry: FileEntryAnc): Observable<EntityResponseType> {
        const copy = this.convert(fileEntry);
        return this.http.put<FileEntryAnc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FileEntryAnc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FileEntryAnc[]>> {
        const options = createRequestOption(req);
        return this.http.get<FileEntryAnc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FileEntryAnc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FileEntryAnc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FileEntryAnc[]>): HttpResponse<FileEntryAnc[]> {
        const jsonResponse: FileEntryAnc[] = res.body;
        const body: FileEntryAnc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FileEntryAnc.
     */
    private convertItemFromServer(fileEntry: FileEntryAnc): FileEntryAnc {
        const copy: FileEntryAnc = Object.assign({}, fileEntry);
        copy.creationTime = this.dateUtils
            .convertDateTimeFromServer(fileEntry.creationTime);
        return copy;
    }

    /**
     * Convert a FileEntryAnc to a JSON which can be sent to the server.
     */
    private convert(fileEntry: FileEntryAnc): FileEntryAnc {
        const copy: FileEntryAnc = Object.assign({}, fileEntry);

        copy.creationTime = this.dateUtils.toDate(fileEntry.creationTime);
        return copy;
    }
}
