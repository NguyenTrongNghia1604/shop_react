//
import OnlyLayout from '../Layout/OnlyLayout';
import {
    Home,
    ShirtMen,
    Pants,
    Accessories,
    Product,
    DetailsProducts,
    ShoppingCart,
    Protify,
    Order,
    SearchProducts,
    Register,
    Login,
    Sale,
    CategoryProduct,
} from '../Page/index';
import OnlyLogin from '../admin/Layout/OnlyLogin';
import { HomeAdmin, Add, Edit, Orders, AdminLogin } from '../admin/index';
const publicConfig = [
    {
        path: '/',
        comment: Home,
    },
    {
        path: '/shirt-men',
        comment: ShirtMen,
    },
    {
        path: '/product',
        comment: Product,
    },
    {
        path: '/pants',
        comment: Pants,
    },
    {
        path: '/phu-kien',
        comment: Accessories,
    },
    {
        path: '/khuyen-mai',
        comment: Sale,
    },
    {
        path: '/detailsProduct/:url',
        comment: DetailsProducts,
    },
    {
        path: '/shoppingCart',
        comment: ShoppingCart,
    },
    {
        path: '/protify',
        comment: Protify,
    },
    {
        path: '/order',
        comment: Order,
    },
    {
        path: '/search-product',
        comment: SearchProducts,
    },
    {
        path: '/category',
        comment: CategoryProduct,
    },
    {
        path: '/register',
        comment: Register,
        layout: OnlyLayout,
    },
    {
        path: '/login',
        comment: Login,
        layout: OnlyLayout,
    },
];
const privateConfig = [
    {
        path: '/admin/home',
        comment: HomeAdmin,
    },
    {
        path: '/admin/home/add',
        comment: Add,
    },
    {
        path: '/admin/home/edit',
        comment: Edit,
    },
    {
        path: '/admin/order',
        comment: Orders,
    },
    {
        path: '/admin/login',
        comment: AdminLogin,
        layout: OnlyLogin,
    },
];
export { publicConfig, privateConfig };
