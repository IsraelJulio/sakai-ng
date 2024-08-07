import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/domain/product';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Category } from 'src/app/domain/category';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
    productDialog: boolean = false;
    uploadedFiles: any[] = [];
    categories: Category[] = [];
    deleteProductDialog: boolean = false;
    productForm: FormGroup | undefined;
    deleteProductsDialog: boolean = false;
    checked: boolean = false;
    // categories: Product[] = [];

    product: Product = {};

    selectedCategory: Category[] = [];
    Apiproducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private fb: UntypedFormBuilder
    ) {
        this.buildForm();
    }
    async ngOnInit() {
        this.categories = await lastValueFrom(this.categoryService.get());

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'isActive', header: 'Status' },
        ];
    }
    reload() {
        this.categoryService
            .get()
            .subscribe((response) => (this.categories = response));
        this.uploadedFiles = [];
    }
    buildForm() {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            id: [0],
            isActive: [false],
            order: [],
        });
    }
    openNew() {
        this.uploadedFiles = [];
        this.product = {};
        this.buildForm();
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.uploadedFiles = [];
        this.product = { ...product };
        this.productForm.patchValue(this.product);
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.categories = this.categories.filter((val) =>
            this.selectedCategory.includes(val)
        );
        const categoryIds: string[] = this.categories.map(
            (product) => product.id
        );
        this.categoryService
            .deleteList(categoryIds)
            .subscribe({
                next: async (response: Category[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produtos deletados com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.categories = response;
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

    confirmDelete(selectedProduct: Category) {
        this.categoryService
            .delete(selectedProduct.id)
            .subscribe({
                next: async (response: Category[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produto deletado com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.categories = response;
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
        let request = this.productForm.getRawValue();
        console.log(request);
        if (request.id != 0) {
            this.categoryService
                .put(request)
                .subscribe({
                    next: async (response: Category[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Atualizado',
                            life: 3000,
                        });
                        console.log(response, 'response');
                        this.categories = response;
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
            this.categoryService
                .post(request)
                .subscribe({
                    next: (response: Category[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produto Criado',
                            life: 3000,
                        });
                        this.categories = response;
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
