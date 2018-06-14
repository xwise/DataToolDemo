import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MyFirstComponentAnc } from './my-first-component-anc.model';
import { MyFirstComponentAncService } from './my-first-component-anc.service';

@Injectable()
export class MyFirstComponentAncPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private myFirstComponentService: MyFirstComponentAncService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.myFirstComponentService.find(id)
                    .subscribe((myFirstComponentResponse: HttpResponse<MyFirstComponentAnc>) => {
                        const myFirstComponent: MyFirstComponentAnc = myFirstComponentResponse.body;
                        myFirstComponent.creationTime = this.datePipe
                            .transform(myFirstComponent.creationTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.myFirstComponentModalRef(component, myFirstComponent);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.myFirstComponentModalRef(component, new MyFirstComponentAnc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    myFirstComponentModalRef(component: Component, myFirstComponent: MyFirstComponentAnc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.myFirstComponent = myFirstComponent;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
