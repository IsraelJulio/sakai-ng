import { style } from '@angular/animations';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard de Pedidos',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                        badge: '2',
                        badgeStyleClass: 'success',
                    },
                ],
            },
            {
                label: 'Gestor de cardápio',
                icon: 'pi pi-fw pi-server',
                items: [
                    {
                        label: 'Visualização no app',
                        icon: PrimeIcons.TABLET,
                        routerLink: ['/menu-management/edit'],
                    },
                    {
                        label: 'Criar Pedido',
                        icon: PrimeIcons.PLUS,
                        routerLink: ['/order'],
                    },
                ],
            },
            {
                label: 'Cadastros',
                icon: 'pi pi-fw pi-server',
                items: [
                    {
                        label: 'Produtos',
                        icon: PrimeIcons.CART_PLUS,
                        routerLink: ['/product'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                    {
                        label: 'Cupons',
                        icon: PrimeIcons.PERCENTAGE,
                        routerLink: ['/coupon'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                    {
                        label: 'Categorias',
                        icon: PrimeIcons.SLACK,
                        routerLink: ['/category'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                ],
            },

            {
                label: 'Meu Desempenho',
                icon: PrimeIcons.CHART_LINE,
                items: [
                    {
                        label: 'Mais Vendidos',
                        icon: PrimeIcons.CHART_LINE,
                        routerLink: ['/product'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                    {
                        label: 'Desempenho Dos Produtos',
                        icon: PrimeIcons.CHART_BAR,
                        routerLink: ['/cupons'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                    {
                        label: 'Clientes',
                        icon: PrimeIcons.USERS,
                        routerLink: ['/categorias'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                    {
                        label: 'Fidelidade',
                        icon: PrimeIcons.STAR,
                        routerLink: ['/categorias'],
                        routerLinkActiveOptions: {
                            exact: true,
                        },
                    },
                ],
            },
            {
                label: 'Robo',
                items: [
                    {
                        label: 'Cadastrar Mensagens',
                        icon: PrimeIcons.COMMENTS,
                    },
                    {
                        label: 'Tempo de Alerta',
                        icon: PrimeIcons.CLOCK,
                    },
                ],
            },
            {
                label: 'Configurações',
                icon: PrimeIcons.COG,
            },
            {
                label: 'UI Components',
                items: [
                    {
                        label: 'Form Layout',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/uikit/formlayout'],
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/uikit/input'],
                    },
                    {
                        label: 'Float Label',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['/uikit/floatlabel'],
                    },
                    {
                        label: 'Invalid State',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/uikit/invalidstate'],
                    },
                    {
                        label: 'Button',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/uikit/button'],
                    },
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/uikit/table'],
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/uikit/list'],
                    },
                    {
                        label: 'Tree',
                        icon: 'pi pi-fw pi-share-alt',
                        routerLink: ['/uikit/tree'],
                    },
                    {
                        label: 'Panel',
                        icon: 'pi pi-fw pi-tablet',
                        routerLink: ['/uikit/panel'],
                    },
                    {
                        label: 'Overlay',
                        icon: 'pi pi-fw pi-clone',
                        routerLink: ['/uikit/overlay'],
                    },
                    {
                        label: 'Media',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/uikit/media'],
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['/uikit/menu'],
                        routerLinkActiveOptions: {
                            paths: 'subset',
                            queryParams: 'ignored',
                            matrixParams: 'ignored',
                            fragment: 'ignored',
                        },
                    },
                    {
                        label: 'Message',
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['/uikit/message'],
                    },
                    {
                        label: 'File',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/uikit/file'],
                    },
                    {
                        label: 'Chart',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/uikit/charts'],
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle',
                        routerLink: ['/uikit/misc'],
                    },
                ],
            },
            {
                label: 'Prime Blocks',
                items: [
                    {
                        label: 'Free Blocks',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/blocks'],
                        badge: 'NEW',
                    },
                    {
                        label: 'All Blocks',
                        icon: 'pi pi-fw pi-globe',
                        url: ['https://www.primefaces.org/primeblocks-ng'],
                        target: '_blank',
                    },
                ],
            },
            {
                label: 'Utilities',
                items: [
                    {
                        label: 'PrimeIcons',
                        icon: 'pi pi-fw pi-prime',
                        routerLink: ['/utilities/icons'],
                    },
                    {
                        label: 'PrimeFlex',
                        icon: 'pi pi-fw pi-desktop',
                        url: ['https://www.primefaces.org/primeflex/'],
                        target: '_blank',
                    },
                ],
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing'],
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login'],
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error'],
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access'],
                            },
                        ],
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud'],
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline'],
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound'],
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty'],
                    },
                ],
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 1.1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 1.1.3',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 2.1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-question',
                        routerLink: ['/documentation'],
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-search',
                        url: ['https://github.com/primefaces/sakai-ng'],
                        target: '_blank',
                    },
                ],
            },
        ];
    }
}
