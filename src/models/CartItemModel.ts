import { ProductModel } from "./ProductModel";

export interface CartItemModel {
    cartItemId: number;
    cartId: number;
    productId: number;
    quantity: number;
    product: ProductModel;
}