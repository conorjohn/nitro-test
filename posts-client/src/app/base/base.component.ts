import { OnDestroy, OnInit, Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ template: '' })
export abstract class BaseComponent implements OnDestroy, OnInit {
    private _subscriptions: Array<Subscription> = [];

    ngOnInit() { }

    addSubscriptions(sub: Subscription): void {
        this._subscriptions.push(sub);
    }

    unsubscribeAll() {
        this._subscriptions.forEach(sub => {
            this.removeSubscription(sub);
        })
    }

    removeSubscription(sub: Subscription) {
        sub.unsubscribe();
    }

    ngOnDestroy() {
        console.log('Destroying', this.constructor['name']);
        this.unsubscribeAll();
    }
}