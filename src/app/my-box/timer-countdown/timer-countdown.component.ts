import { Component, Input, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'app-timer-countdown',
    templateUrl: './timer-countdown.component.html',
    styleUrls: ['./timer-countdown.component.scss'],
})
export class TimerCountdownComponent implements OnInit {
    constructor() {}
    @Input() createdDate: string;

    private subscription: Subscription;

    public dateNow = new Date();
    public dDay = new Date();
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute = 60;

    public timeDifference: any;
    public secondsToDday: any;
    public minutesToDday: any;
    public hoursToDday: any;
    public daysToDday: any;

    private getTimeDifference() {
        this.timeDifference =
            new Date().getTime() - new Date(this.createdDate).getTime();
        if (this.timeDifference > 0) {
            this.allocateTimeUnits(this.timeDifference);
        } else {
        }
    }

    private allocateTimeUnits(timeDifference: any) {
        this.secondsToDday = Math.floor(
            (timeDifference / this.milliSecondsInASecond) %
                this.SecondsInAMinute
        );
        this.minutesToDday = Math.floor(
            (timeDifference /
                (this.milliSecondsInASecond * this.minutesInAnHour)) %
                this.SecondsInAMinute
        );
        this.hoursToDday = Math.floor(
            (timeDifference /
                (this.milliSecondsInASecond *
                    this.minutesInAnHour *
                    this.SecondsInAMinute)) %
                this.hoursInADay
        );
        this.daysToDday = Math.floor(
            timeDifference /
                (this.milliSecondsInASecond *
                    this.minutesInAnHour *
                    this.SecondsInAMinute *
                    this.hoursInADay)
        );
    }

    ngOnInit() {
        this.subscription = interval(1000).subscribe((x) => {
            this.getTimeDifference();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
