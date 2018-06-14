import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MyFirstComponentAnc } from './my-first-component-anc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MyFirstComponentAnc>;

@Injectable()
export class MyFirstComponentAncService {

    private resourceUrl =  SERVER_API_URL + 'api/my-first-components';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(myFirstComponent: MyFirstComponentAnc): Observable<EntityResponseType> {
        const copy = this.convert(myFirstComponent);
        return this.http.post<MyFirstComponentAnc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(myFirstComponent: MyFirstComponentAnc): Observable<EntityResponseType> {
        const copy = this.convert(myFirstComponent);
        return this.http.put<MyFirstComponentAnc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MyFirstComponentAnc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MyFirstComponentAnc[]>> {
        const options = createRequestOption(req);
        return this.http.get<MyFirstComponentAnc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MyFirstComponentAnc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MyFirstComponentAnc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MyFirstComponentAnc[]>): HttpResponse<MyFirstComponentAnc[]> {
        const jsonResponse: MyFirstComponentAnc[] = res.body;
        const body: MyFirstComponentAnc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MyFirstComponentAnc.
     */
    private convertItemFromServer(myFirstComponent: MyFirstComponentAnc): MyFirstComponentAnc {
        const copy: MyFirstComponentAnc = Object.assign({}, myFirstComponent);
        copy.creationTime = this.dateUtils
            .convertDateTimeFromServer(myFirstComponent.creationTime);
        return copy;
    }

    /**
     * Convert a MyFirstComponentAnc to a JSON which can be sent to the server.
     */
    private convert(myFirstComponent: MyFirstComponentAnc): MyFirstComponentAnc {
        const copy: MyFirstComponentAnc = Object.assign({}, myFirstComponent);

        copy.creationTime = this.dateUtils.toDate(myFirstComponent.creationTime);
        return copy;
    }
}
