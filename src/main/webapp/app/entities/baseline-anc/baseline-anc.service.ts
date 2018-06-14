import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BaselineAnc } from './baseline-anc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BaselineAnc>;

@Injectable()
export class BaselineAncService {

    private resourceUrl =  SERVER_API_URL + 'api/baselines';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(baseline: BaselineAnc): Observable<EntityResponseType> {
        const copy = this.convert(baseline);
        return this.http.post<BaselineAnc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(baseline: BaselineAnc): Observable<EntityResponseType> {
        const copy = this.convert(baseline);
        return this.http.put<BaselineAnc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BaselineAnc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BaselineAnc[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaselineAnc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BaselineAnc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BaselineAnc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BaselineAnc[]>): HttpResponse<BaselineAnc[]> {
        const jsonResponse: BaselineAnc[] = res.body;
        const body: BaselineAnc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BaselineAnc.
     */
    private convertItemFromServer(baseline: BaselineAnc): BaselineAnc {
        const copy: BaselineAnc = Object.assign({}, baseline);
        copy.creationTime = this.dateUtils
            .convertDateTimeFromServer(baseline.creationTime);
        copy.milestone = this.dateUtils
            .convertDateTimeFromServer(baseline.milestone);
        return copy;
    }

    /**
     * Convert a BaselineAnc to a JSON which can be sent to the server.
     */
    private convert(baseline: BaselineAnc): BaselineAnc {
        const copy: BaselineAnc = Object.assign({}, baseline);

        copy.creationTime = this.dateUtils.toDate(baseline.creationTime);

        copy.milestone = this.dateUtils.toDate(baseline.milestone);
        return copy;
    }
}
