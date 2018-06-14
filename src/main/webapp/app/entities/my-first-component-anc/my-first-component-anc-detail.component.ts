import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MyFirstComponentAnc } from './my-first-component-anc.model';
import { MyFirstComponentAncService } from './my-first-component-anc.service';

@Component({
    selector: 'jhi-my-first-component-anc-detail',
    templateUrl: './my-first-component-anc-detail.component.html'
})
export class MyFirstComponentAncDetailComponent implements OnInit, OnDestroy {

    myFirstComponent: MyFirstComponentAnc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private myFirstComponentService: MyFirstComponentAncService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMyFirstComponents();
    }

    load(id) {
        this.myFirstComponentService.find(id)
            .subscribe((myFirstComponentResponse: HttpResponse<MyFirstComponentAnc>) => {
                this.myFirstComponent = myFirstComponentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMyFirstComponents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'myFirstComponentListModification',
            (response) => this.load(this.myFirstComponent.id)
        );
    }
}
