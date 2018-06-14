import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BaselineAnc } from './baseline-anc.model';
import { BaselineAncService } from './baseline-anc.service';

@Component({
    selector: 'jhi-baseline-anc-detail',
    templateUrl: './baseline-anc-detail.component.html'
})
export class BaselineAncDetailComponent implements OnInit, OnDestroy {

    baseline: BaselineAnc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private baselineService: BaselineAncService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBaselines();
    }

    load(id) {
        this.baselineService.find(id)
            .subscribe((baselineResponse: HttpResponse<BaselineAnc>) => {
                this.baseline = baselineResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBaselines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'baselineListModification',
            (response) => this.load(this.baseline.id)
        );
    }
}
