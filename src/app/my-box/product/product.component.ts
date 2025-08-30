import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { Category } from 'src/app/domain/category';
import { Product } from 'src/app/domain/product';
import { ProductService } from '../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../service/category.service';
import { lastValueFrom } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
    productDialog: boolean = false;
    uploadedFiles: any[] = [];
    categories: Category[] = [];
    deleteProductDialog: boolean = false;
    productForm: FormGroup | undefined;
    deleteProductsDialog: boolean = false;
    checked: boolean = false;
    products: Product[] = [];

    product: Product = {};
    productImage: any[] = [];
    selectedProducts: Product[] = [];
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
        this.productImage = [
            {
                label: 'Fritas',
                value: 'assets/my-box/Fritas.jpg',
                src: 'assets/my-box/Fritas.jpg',
            },
            {
                label: 'Batata',
                value: 'assets/my-box/Batata.jpg',
                src: 'assets/my-box/Batata.jpg',
            },
            {
                label: 'KingBox',
                value: 'assets/my-box/KingBox.jpg',
                src: 'assets/my-box/KingBox.jpg',
            },
            {
                label: 'MyBox',
                value: 'assets/my-box/MyBox.jpg',
                src: 'assets/my-box/MyBox.jpg',
            },
            {
                label: 'myBox2',
                value: 'assets/my-box/myBox2.jpg',
                src: 'assets/my-box/myBox2.jpg',
            },
        ];
    }
    async ngOnInit() {
        this.products = await lastValueFrom(this.productService.get());
        this.categories = await lastValueFrom(
            this.categoryService.getActives()
        );

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'isActive', header: 'Status' },
        ];
    }
    reload() {
        this.productService
            .get()
            .subscribe((response) => (this.products = response));
        this.uploadedFiles = [];
    }
    buildForm() {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            id: [0],
            description: ['', Validators.required],
            price: [null, Validators.required],
            isActive: [false],
            image: [''],
            categoryId: [null, Validators.required],
            status: [],
            imageUrl: [],
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
        this.products = this.products.filter((val) =>
            this.selectedProducts.includes(val)
        );
        const productIds: string[] = this.products.map((product) => product.id);
        this.productService
            .deleteList(productIds)
            .subscribe({
                next: async (response: Product[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produtos deletados com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.products = response;
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

    confirmDelete(selectedProduct: Product) {
        this.productService
            .delete(selectedProduct.id)
            .subscribe({
                next: async (response: Product[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produto deletado com sucesso!',
                        life: 3000,
                    });
                    console.log(response, 'response');
                    this.products = response;
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
            this.productService
                .put(request)
                .subscribe({
                    next: async (response: Product[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Atualizado',
                            life: 3000,
                        });
                        console.log(response, 'response');
                        this.products = response;
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
            this.productService
                .post(request)
                .subscribe({
                    next: (response: Product[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produto Criado',
                            life: 3000,
                        });
                        this.products = response;
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

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
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
    async onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
            const base64Image = await this.convertFileToBase64(file);
            this.productForm.patchValue({
                imageBase64: base64Image,
            });
        }

        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
    }

    convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }
}
