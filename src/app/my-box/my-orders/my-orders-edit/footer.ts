import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'footer',
    standalone: true,
    imports: [ButtonModule],
    template: `
        <div
            class="flex w-full d mt-3"
            style="display: flex;justify-content:space-between;"
        >
            <p-button
                type="button"
                label="Cancel"
                icon="pi pi-times"
                class="p-button-warning"
                (click)="
                    closeDialog({
                        summary: 'close'
                    })
                "
            />
            <p-button
                type="button"
                label="Avançar Pedido"
                icon="pi pi-arrow-circle-right"
                (click)="
                    avanceDialog({
                        summary: 'next'
                    })
                "
            />
        </div>
    `,
})
export class Footer {
    constructor(public ref: DynamicDialogRef) {}

    closeDialog(data) {
        this.ref.close(data);
    }
    avanceDialog(data) {
        this.ref.close(data);
    }
}
