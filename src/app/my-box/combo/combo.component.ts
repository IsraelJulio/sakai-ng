import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from '../service/product.service';
import { lastValueFrom } from 'rxjs';
import { Combo } from 'src/app/domain/combo';
import { Product } from 'src/app/domain/product';
import { ComboService } from '../service/combo.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-combo',
    templateUrl: './combo.component.html',
    styleUrl: './combo.component.scss',
})
export class ComboComponent implements OnInit {
    productDialog: boolean = false;
    uploadedFiles: any[] = [];
    combos: Combo[] = [];
    deleteProductDialog: boolean = false;
    comboForm: FormGroup | undefined;
    deleteProductsDialog: boolean = false;
    checked: boolean = false;
    // combos: Product[] = [];

    product: Product = {};
    totalProduct: number = 0;
    selectedCombo: Combo[] = [];
    Apiproducts: Product[] = [];
    products: Product[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private comboService: ComboService,
        private fb: UntypedFormBuilder
    ) {
        this.buildForm();
    }
    async ngOnInit() {
        this.combos = await lastValueFrom(this.comboService.get());
        this.products = await lastValueFrom(this.productService.getActives());
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'combo', header: 'combo' },
            { field: 'rating', header: 'Reviews' },
            { field: 'isActive', header: 'Status' },
        ];
    }
    getMax() {
        if (
            this.comboForm.get('minValue').value >
            this.comboForm.get('maxValue').value
        )
            this.comboForm
                .get('maxValue')
                .setValue(this.comboForm.get('minValue').value);
        return;
    }
    reload() {
        this.comboService
            .get()
            .subscribe((response) => (this.combos = response));
        this.uploadedFiles = [];
    }
    buildForm() {
        this.comboForm = this.fb.group({
            name: ['', Validators.required],
            products: [''],
            description: [''],
            minValue: [''],
            maxValue: [''],
            id: [0],
            isActive: [false],
            order: [],
            categoryId: [-1],
        });
    }
    openNew() {
        this.uploadedFiles = [];
        this.product = {};
        this.buildForm();
        this.submitted = false;
        this.productDialog = true;
    }
    totalProducts(event: Product[]) {
        var numbers = event.map((product) => product.price);
        this.totalProduct = numbers.reduce(
            (total, currentValue) => total + currentValue,
            0
        );
    }
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.uploadedFiles = [];
        this.product = { ...product };
        this.comboForm.patchValue(this.product);
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.combos = this.combos.filter((val) =>
            this.selectedCombo.includes(val)
        );
        const comboIds: string[] = this.combos.map((product) => product.id);
        this.comboService
            .deleteList(comboIds)
            .subscribe({
                next: async (response: Combo[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produtos deletados com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.combos = response;
                    this.productDialog = false;
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
                this.deleteProductDialog = false;
            });

        this.product = {};
    }

    confirmDelete(selectedProduct: Combo) {
        this.comboService
            .delete(selectedProduct.id)
            .subscribe({
                next: async (response: Combo[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produto deletado com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.combos = response;
                    this.productDialog = false;
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
                this.deleteProductDialog = false;
            });

        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        let request = this.comboForm.getRawValue();
        console.log(request);
        if (request.id != 0) {
            this.comboService
                .put(request)
                .subscribe({
                    next: async (response: Combo[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Atualizado',
                            life: 3000,
                        });
                        console.log(response, 'response');
                        this.combos = response;
                        this.productDialog = false;
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
            this.comboService
                .post(request)
                .subscribe({
                    next: (response: Combo[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produto Criado',
                            life: 3000,
                        });
                        this.combos = response;
                        this.productDialog = false;
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
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
