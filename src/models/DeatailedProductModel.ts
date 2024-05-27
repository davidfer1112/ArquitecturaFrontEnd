import { ProductModel } from "./ProductModel";

export interface DetailedProductModel extends ProductModel {
    description: string;
    categoryId: number;
    stock: number;
    category: {
        categoryId: number;
        categoryName: string;
        description: string;
    };
}