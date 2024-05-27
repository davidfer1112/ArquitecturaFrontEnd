import { CartItemModel } from "./CartItemModel";

export interface CartModel {
    cartId: number;
    userId: number;
    createdAt: string;
    user: {
        userId: number;
        webid: string;
    };
    cartItems: CartItemModel[];
}
