import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../service/category.service';
import { Category } from 'src/app/domain/category';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { ProductService } from '../../service/product.service';
import { group } from '@angular/animations';

@Component({
    selector: 'app-menu-management',
    templateUrl: './menu-management.component.html',
    styleUrl: './menu-management.component.scss',
})
export class MenuManagementComponent implements OnInit {
    categories: Category[];
    categoriesAvailable: Category[];
    products: Product[];
    groupedCategories: { category: Category; products: Product[] }[] = [];
    constructor(
        private categoryService: CategoryService,
        private messageService: MessageService,
        private productService: ProductService
    ) {}
    async ngOnInit() {
        forkJoin({
            categories: this.categoryService.get(),
            products: this.productService
                .get()
                .pipe(
                    map((products) =>
                        products.sort((a, b) => a.order - b.order)
                    )
                ),
        }).subscribe(({ categories, products }) => {
            this.categories = categories;
            this.products = products;
            this.groupCategoriesByIsActive();
            this.addMissingCategories();
            this.getCategories();
        });
    }
    saveCategoryOrder(): void {
        this.categoryService
            .orderCategory(this.categoriesAvailable)
            .subscribe((x) => {
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Ordem Atualizada',
                    life: 3000,
                });
            });
        console.log('Nova ordem das categorias:', this.categories);
    }
    saveProductOrder(): void {
        this.productService
            .orderProduct(this.groupedCategories.map((x) => x.products))
            .subscribe((x) => {
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Ordem Atualizada',
                    life: 3000,
                });
            });
        console.log(
            'Nova ordem das categorias:',
            this.groupedCategories.map((x) => x.products)
        );
    }
    groupCategoriesByIsActive(): void {
        if (this.products === undefined) return;
        const groups = this.products.reduce((groups, product) => {
            const key = product.category.id;
            if (!groups[key]) {
                groups[key] = {
                    category: product.category,
                    products: [],
                };
            }
            groups[key].products.push(product);
            return groups;
        }, {} as { [key: string]: { category: Category; products: Product[] } });

        // Converte o objeto em um array para iteração no template
        this.groupedCategories = Object.keys(groups)
            .map((key) => groups[key])
            .sort((a, b) => a.category.order - b.category.order);
    }
    getCategories() {
        this.categoriesAvailable = this.groupedCategories
            .map((x) => x.category)
            .sort((a, b) => a.order - b.order);
        return;
    }
    addMissingCategories(): void {
        const existingCategoryIds = new Set(
            this.groupedCategories.map((group) => group.category.id)
        );
        const missingCategories = this.categories.filter(
            (category) => !existingCategoryIds.has(category.id)
        );

        missingCategories.forEach((category) => {
            this.groupedCategories.push({
                category,
                products: [],
            });
        });
    }
}
