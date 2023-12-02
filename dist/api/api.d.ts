/// <reference types="node" />
import { ReadStream } from "fs";
import type { Product, Recommendation, ProductPrices, SkuInventory, ProductPartialEdit, ProductIds, Brand, OrderStatus } from "./type";
interface TikTokConfig {
    appKey: string;
    accessToken: string;
    shopCipher?: string;
    shopId?: string;
    appSecret: string;
}
declare class TikTok {
    private appKey;
    private accessToken;
    private shopCipher?;
    private shopId?;
    private appSecret;
    constructor({ appKey, accessToken, shopCipher, shopId, appSecret, }: TikTokConfig);
    private generateRequestSign;
    setShop({ shopCipher, shopId }: {
        shopCipher: string;
        shopId: string;
    }): void;
    getShops(): Promise<any>;
    getCategories(): Promise<any>;
    getBrands(brandName: string, categoryId?: string): Promise<any>;
    addCustomBrands(brand: Brand): Promise<any>;
    getProduct(id: string): Promise<any>;
    searchInventory(bodyData?: {}): Promise<any>;
    addProduct(productData: Product): Promise<any>;
    getSellerShops(): Promise<any>;
    recommendCategory(product: Recommendation): Promise<any>;
    updateProduct(id: string, productData: Product): Promise<any>;
    getWarehouses(): Promise<any>;
    updateProductPrices(id: string, skus: ProductPrices): Promise<any>;
    partiallyEditProduct(id: string, productData: ProductPartialEdit): Promise<any>;
    getCategoryAttributes(id: string): Promise<any>;
    updateProductInventory(id: string, skus: SkuInventory[]): Promise<any>;
    activateProducts(productIds: ProductIds): Promise<any>;
    deactivateProducts(productIds: ProductIds): Promise<any>;
    deleteProducts(productIds: ProductIds): Promise<any>;
    recoverProducts(productIds: ProductIds): Promise<any>;
    addImage(image: ReadStream): Promise<any>;
    getOrders(orderStatus: OrderStatus, pageToken?: string): Promise<any>;
}
export default TikTok;
