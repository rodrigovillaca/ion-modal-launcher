import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ModalOptions } from '@ionic/core/dist/types/components/modal/modal-interface';
import { Observable, Subscription } from 'rxjs';

export interface ModalLauncherOptions {
    modalOptions: ModalOptions;
    callback?: (details: OverlayEventDetail) => void;
}

@Component({
    selector: 'ion-modal-launcher',
    template: ''
})
export class IonModalLauncherComponent implements OnInit, OnDestroy {
    private _observables: Observable<ModalLauncherOptions>[];
    get observables(): Observable<ModalLauncherOptions>[] {
        return this._observables;
    }
    @Input() set observables(value: Observable<ModalLauncherOptions>[]) {
        this.unsubscribe();
        this._observables = value;
        this.subscribe();
    }
    subscriptions: Subscription[] = [];

    constructor(private modal: ModalController) {}

    ngOnDestroy() {
        this.unsubscribe();
    }

    ngOnInit() {}

    async launchModal(options: ModalLauncherOptions) {
        const modal = await this.modal.create(options.modalOptions);
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (typeof options.callback === 'function') {
                options.callback(detail);
            }
        });

        return await modal.present();
    }

    subscribe() {
        if (!Array.isArray(this.observables)) {
            return;
        }
        this.observables.forEach(observable => {
            this.subscriptions.push(observable.subscribe(options => this.launchModal(options)));
        });
    }

    unsubscribe() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
}
