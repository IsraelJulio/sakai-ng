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
import { Coupon } from 'src/app/domain/coupon';
import { CouponService } from '../service/coupon.service';
import { CouponType } from 'src/app/domain/couponType';
import { ClientService } from '../service/client.service';
import { Client } from 'src/app/domain/client';
import { OrderService } from '../service/order.service';
import { MyOrder } from 'src/app/domain/my-order';
import { Router } from '@angular/router';
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
    productDialog: boolean = false;
    uploadedFiles: any[] = [];
    categories: Category[] = [];
    coupons: Coupon[] = [];
    deleteProductDialog: boolean = false;
    orderForm: FormGroup | undefined;
    deleteProductsDialog: boolean = false;
    checked: boolean = false;
    products: Product[] = [];
    total: number = 0;
    product: Product = {};
    colorclass: string = 'danger';
    selectedProducts: Product[] = [];
    Apiproducts: Product[] = [];
    clients: Client[] = [];
    filteredClients: Client[] = [];
    desconto: number = 0;
    totalProduct: number = 0;
    submitted: boolean = false;
    coupon: Coupon;

    cols: any[] = [];

    statuses: any[] = [];
    methods: any[] = [];
    deliveryDrop: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private couponService: CouponService,
        private clientServe: ClientService,
        private orderService: OrderService,
        private router: Router,
        private fb: UntypedFormBuilder
    ) {
        this.buildForm();
    }
    async ngOnInit() {
        this.products = await lastValueFrom(this.productService.getActives());
        this.coupons = await lastValueFrom(this.couponService.getActives());
        this.categories = await lastValueFrom(
            this.categoryService.getActives()
        );
        this.clients = await lastValueFrom(this.clientServe.get());

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'isActive', header: 'Status' },
        ];
        this.methods = [
            { label: 'Pix', value: 0, src: 'assets/my-box/pix.png' },
            {
                label: 'Card',
                value: 1,
                src: 'assets/my-box/cartao.png',
            },
            {
                label: 'Money',
                value: 2,
                src: 'assets/my-box/dinheiro.png',
            },
        ];
        this.deliveryDrop = [
            {
                label: 'Delivery',
                value: true,
                src: 'assets/my-box/delivery.png',
            },
            {
                label: 'Balcão',
                value: false,
                src: 'assets/my-box/balcao.jpg',
            },
        ];
    }
    filterClient(event: any) {
        const filtered: Client[] = [];
        const query = event.query;

        for (let i = 0; i < this.clients.length; i++) {
            const cliente = this.clients[i];

            if (cliente.name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(cliente);
            } else if (
                cliente.phoneNumber.toLowerCase().includes(query.toLowerCase())
            ) {
                filtered.push(cliente);
            }
        }

        this.filteredClients = filtered;
    }
    totalProducts(event: Product[]) {
        var numbers = event.map((product) => product.price);
        this.totalProduct = numbers.reduce(
            (total, currentValue) => total + currentValue,
            0
        );
        this.totalCalculated();
    }
    totalCoupon(event: Coupon) {
        this.coupon = event;
        this.totalCalculated();
    }
    totalCalculated() {
        if (this.coupon?.couponType == 0) {
            this.desconto = this.coupon.value;
        } else if (this.coupon?.couponType == 1 && this.totalProduct > 0) {
            this.desconto = (this.coupon.value * this.totalProduct) / 100;
        }
        this.total = this.totalProduct - this.desconto;
        if (this.total > 0) this.colorclass = 'success';
        else this.colorclass = 'danger';

        this.orderForm.get('totalPrice').setValue(this.total);
    }
    reload() {
        this.productService
            .get()
            .subscribe((response) => (this.products = response));
        this.uploadedFiles = [];
    }
    buildForm() {
        this.orderForm = this.fb.group({
            name: ['', Validators.required],
            id: [0],
            totalPrice: [false],
            coupon: [''],
            products: [''],
            phoneNumber: [null, Validators.required],
            paymentMethod: [null, Validators.required],
            isDelivery: [null, Validators.required],
            houseNumber: [null, Validators.required],
            reference: [''],
            city: [null, Validators.required],
            neighborhood: [null, Validators.required],
            complement: [''],
            street: [null, Validators.required],
            clientId: [null],
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
        this.orderForm.patchValue(this.product);
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
        let request = this.orderForm.getRawValue();

        if (request.id != 0) {
            this.orderService
                .put(request)
                .subscribe({
                    next: async (response: MyOrder[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Predido Atualizado',
                            life: 3000,
                        });

                        this.products = response;
                        this.productDialog = false;
                        this.router.navigate(['']);
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
            this.orderService
                .post(request)
                .subscribe({
                    next: (response: MyOrder[]) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Pedido criado com sucesso',
                            life: 3000,
                        });
                        this.products = response;
                        this.productDialog = false;
                        this.router.navigate(['']);
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
            this.orderForm.patchValue({
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
    onSelectNumber(event: Client) {
        this.orderForm.get('houseNumber').setValue(event.houseNumber);
        this.orderForm.get('reference').setValue(event.reference);
        this.orderForm.get('city').setValue(event.city);
        this.orderForm.get('neighborhood').setValue(event.neighborhood);
        this.orderForm.get('complement').setValue(event.complement);
        this.orderForm.get('street').setValue(event.street);
        this.orderForm.get('name').setValue(event.name);
        this.orderForm.get('phoneNumber').setValue(event.phoneNumber);
        this.orderForm.get('clientId').setValue(event.id);
        this.messageService.add({
            severity: 'info',
            summary: 'Successful',
            detail: 'Dados puxados com sucesso',
            life: 2000,
        });
    }
    onSubmit() {
        this.saveProduct();
    }
    addPhone(event: any) {
        this.orderForm.get('phoneNumber').setValue(event);
    }
    deletCoupon() {
        this.desconto = 0;
        this.total = 0;
    }
}
