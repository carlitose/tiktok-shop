"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const common_1 = __importDefault(require("../common/common"));
const schemas_1 = require("./schemas");
const BASE_URL = "https://open-api.tiktokglobalshop.com";
const VERSION = "202309";
class TikTok {
    constructor({ appKey, accessToken, shopCipher, shopId, appSecret, }) {
        this.appKey = appKey;
        this.accessToken = accessToken;
        this.shopCipher = shopCipher;
        this.shopId = shopId;
        this.appSecret = appSecret;
    }
    generateRequestSign(endpoint, bodyData, query = "", weNeedShopCipher = true) {
        const accessToken = this.accessToken;
        const appKey = this.appKey;
        const shopCipher = this.shopCipher;
        const shopId = this.shopId;
        const appSecret = this.appSecret;
        let myUrl = `${BASE_URL}${endpoint}?access_token=${accessToken}&app_key=${appKey}`;
        if (weNeedShopCipher) {
            myUrl += `&shop_cipher=${shopCipher || ""}`;
        }
        myUrl += `&shop_id=${shopId || ""}&version=${VERSION}${query}`;
        const { signature, timestamp } = common_1.default.signByUrl(myUrl, appSecret, bodyData);
        const url = `${myUrl}&timestamp=${timestamp}&sign=${signature}`;
        const headers = {
            "x-tts-access-token": accessToken,
        };
        return { url, headers, data: bodyData };
    }
    setShop({ shopCipher, shopId }) {
        this.shopCipher = shopCipher;
        this.shopId = shopId;
    }
    getShops() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/authorization/${VERSION}/shops`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBrands(brandName, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = categoryId
                ? `&category_id=${categoryId}&brand_name=${brandName}&page_size=100&is_authorized=true`
                : `&brand_name=${brandName}&page_size=100&is_authorized=true`;
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/brands`, undefined, query);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addCustomBrands(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.brandSchema.validate(brand);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/brands`, brand, "", false);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    searchInventory(bodyData = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/inventory/search`, bodyData);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productSchema.validate(productData);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products`, productData);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSellerShops() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/seller/${VERSION}/shops`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    recommendCategory(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.recommendationSchema.validate(product);
            if (error) {
                throw new Error(`Invalid data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/categories/recommend`, product);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productSchema.validate(productData);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}`, productData);
            try {
                const response = yield axios_1.default.put(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/logistics/${VERSION}/warehouses`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProductPrices(id, skus) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productPricesSchema.validate(skus);
            if (error) {
                throw new Error(`Invalid SKU data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}/prices/update`, skus);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    partiallyEditProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productPartailEditSchema.validate(productData);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}/partial_edit`, productData);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategoryAttributes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/categories/${id}/attributes`, undefined, '&locale=en-US');
            try {
                const response = yield axios_1.default.get(url, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProductInventory(id, skus) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.skuInventorySchema.validate(skus);
            if (error) {
                throw new Error(`Invalid SKU data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}/inventory/update`, {
                skus,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    activateProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/activate`, {
                product_ids: productIds,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deactivateProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/deactivate`, {
                product_ids: productIds,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products`, { product_ids: productIds });
            try {
                const response = yield axios_1.default.delete(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    recoverProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/recover`, {
                product_ids: productIds,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers } = this.generateRequestSign(`/product/${VERSION}/images/upload`, undefined, "", false);
            try {
                const response = yield axios_1.default.post(url, { data: image }, { headers: Object.assign(Object.assign({}, headers), { "Content-type": "multipart/form-data" }) });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TikTok;
