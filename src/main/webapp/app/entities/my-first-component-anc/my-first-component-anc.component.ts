import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MyFirstComponentAnc } from './my-first-component-anc.model';
import { MyFirstComponentAncService } from './my-first-component-anc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-my-first-component-anc',
    templateUrl: './my-first-component-anc.component.html'
})
export class MyFirstComponentAncComponent implements OnInit, OnDestroy {
myFirstComponents: MyFirstComponentAnc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private myFirstComponentService: MyFirstComponentAncService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.myFirstComponentService.query().subscribe(
            (res: HttpResponse<MyFirstComponentAnc[]>) => {
                this.myFirstComponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMyFirstComponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MyFirstComponentAnc) {
        return item.id;
    }
    registerChangeInMyFirstComponents() {
        this.eventSubscriber = this.eventManager.subscribe('myFirstComponentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
