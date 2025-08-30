import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paymentMethod',
})
export class PaymentMethodPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 0:
                return 'Pix';
            case 1:
                return 'Cartão';
            case 2:
                return 'Dinheiro';
            default:
                return 'Desconhecido';
        }
    }
}
