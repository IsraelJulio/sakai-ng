import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/domain/product';
import { ProductService } from '../service/product.service';
import { Coupon } from 'src/app/domain/coupon';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CouponService } from '../service/coupon.service';
import { lastValueFrom } from 'rxjs';
import { CouponType } from 'src/app/domain/couponType';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html',
    styleUrl: './coupon.component.scss',
})
export class CouponComponent implements OnInit {
    couponDialog: boolean = false;
    coupons: Coupon[] = [];
    deleteCouponDialog: boolean = false;
    couponForm: FormGroup | undefined;
    deleteCouponsDialog: boolean = false;
    checked: boolean = false;

    coupon: Product = {};

    selectedCoupon: Coupon[] = [];
    ApiCoupons: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private couponService: CouponService,
        private fb: UntypedFormBuilder
    ) {
        this.buildForm();
    }
    async ngOnInit() {
        this.coupons = await lastValueFrom(this.couponService.get());

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'name', header: 'name' },
            { field: 'isActive', header: 'isActive' },
            { field: 'cod', header: 'cod' },
        ];
        this.statuses = [
            { label: 'Reais', value: 0 },
            { label: 'Porcentagem', value: 1 },
        ];
    }
    reload() {
        this.couponService
            .get()
            .subscribe((response) => (this.coupons = response));
    }
    buildForm() {
        this.couponForm = this.fb.group({
            name: ['', Validators.required],
            id: [0],
            couponType: [Validators.required],
            value: [null, Validators.required],
            isActive: [false],
            cod: ['', Validators.required],
        });
    }
    onInputChange(event: any) {
        this.couponForm.get('cod').setValue(event.target.value.toUpperCase());
    }
    openNew() {
        this.coupon = {};
        this.buildForm();
        this.submitted = false;
        this.couponDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteCouponsDialog = true;
    }

    editCoupon(product: Product) {
        this.coupon = { ...product };
        this.couponForm.patchValue(this.coupon);
        this.couponDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteCouponsDialog = true;
        this.coupon = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteCouponsDialog = false;
        this.coupons = this.coupons.filter((val) =>
            this.selectedCoupon.includes(val)
        );
        const categoryIds: string[] = this.coupons.map((product) => product.id);
        this.couponService
            .deleteList(categoryIds)
            .subscribe({
                next: async (response: Coupon[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produtos deletados com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.coupons = response;
                    this.couponDialog = false;
                },
                error: (err: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro!',
                        detail: err.error,
                        life: 3000,
                    });
                },
            })
            .add(() => {
                this.deleteCouponsDialog = false;
            });

        this.coupon = {};
    }

    confirmDelete(selectedProduct: Coupon) {
        this.couponService
            .delete(selectedProduct.id)
            .subscribe({
                next: async (response: Coupon[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produto deletado com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.coupons = response;
                    this.couponDialog = false;
                },
                error: (err: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro!',
                        detail: err.error,
                        life: 3000,
                    });
                },
            })
            .add(() => {
                this.deleteCouponsDialog = false;
            });

        this.coupon = {};
    }

    hideDialog() {
        this.couponDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        let request = this.couponForm.getRawValue();
        console.log(request);
        if (request.id != 0) {
            this.couponService
                .put(request)
                .subscribe({
                    next: async (response: Coupon[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Atualizado',
                            life: 3000,
                        });
                        console.log(response, 'response');
                        this.coupons = response;
                        this.couponDialog = false;
                    },
                    error: (err: any) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro!',
                            detail: err.error,
                            life: 3000,
                        });
                    },
                })
                .add(() => {});
        } else {
            console.log(request);
            this.couponService
                .post(request)
                .subscribe({
                    next: (response: Coupon[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produto Criado',
                            life: 3000,
                        });
                        this.coupons = response;
                        this.couponDialog = false;
                    },
                    error: (err: any) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro!',
                            detail: err.error,
                            life: 3000,
                        });
                    },
                })
                .add(() => {});
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.coupons.length; i++) {
            if (this.coupons[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
