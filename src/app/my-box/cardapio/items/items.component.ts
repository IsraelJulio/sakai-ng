import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/domain/category';
import { Product } from 'src/app/domain/product';
import { ProductService } from '../../service/product.service';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../service/category.service';
import { forkJoin, map } from 'rxjs';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss',
})
export class ItemsComponent implements OnInit {
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
            this.categories = categories.filter((x) => x.isActive);
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
    selectProduct(product: Product) {
        console.log(product);
    }
}
