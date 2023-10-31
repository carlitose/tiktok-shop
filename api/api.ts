import axios from "axios";
import Common from "../common/common";
import {
  productSchema,
  recommendationSchema,
  productPricesSchema,
  productPartailEditSchema,
  skuInventorySchema,
  productIdsSchema,
} from "./schemas";

const BASE_URL = "https://open-api.tiktokglobalshop.com";
const VERSION = "202309";
const LOCALE = "en-US";

import type {
  Product,
  Recommendation,
  ProductPrices,
  SkuInventory,
  ProductPartialEdit,
  ProductIds,
} from "./type";

interface TikTokConfig {
  appKey: string;
  accessToken: string;
  shopCipher?: string;
  shopId?: string;
  appSecret: string;
}

class TikTok {
  private appKey: string;
  private accessToken: string;
  private shopCipher?: string;
  private shopId?: string;
  private appSecret: string;

  constructor({
    appKey,
    accessToken,
    shopCipher,
    shopId,
    appSecret,
  }: TikTokConfig) {
    this.appKey = appKey;
    this.accessToken = accessToken;
    this.shopCipher = shopCipher;
    this.shopId = shopId;
    this.appSecret = appSecret;
  }

  private generateRequestSign(endpoint: string, bodyData: object = {}) {
    const accessToken = this.accessToken;
    const appKey = this.appKey;
    const shopCipher = this.shopCipher;
    const shopId = this.shopId;
    const appSecret = this.appSecret;

    const myUrl = `${BASE_URL}${endpoint}?access_token=${accessToken}&app_key=${appKey}&shop_cipher=${
      shopCipher || ""
    }&shop_id=${shopId || ""}&version=${VERSION}`;

    const { signature, timestamp } = Common.signByUrl(myUrl, appSecret, bodyData);

    const url = `${myUrl}&timestamp=${timestamp}&sign=${signature}`;
    const headers = {
      "x-tts-access-token": accessToken,
    };

    return { url, headers, data: bodyData };
  }

  setShop({ shopCipher, shopId }: { shopCipher: string; shopId: string }) {
    this.shopCipher = shopCipher;
    this.shopId = shopId;
  }
  async getShops() {
    const { url, headers, data } = this.generateRequestSign(
      `/authorization/${VERSION}/shops`
    );

    try {
      const response = await axios.get(url, { headers, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id: string) {
    const { url, headers, data } = this.generateRequestSign(
      `/${VERSION}/products/${id}`
    );

    try {
      const response = await axios.get(url, { headers, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async searchInventory(bodyData = {}) {
    const { url, headers, data } = this.generateRequestSign(
      `/${VERSION}/inventory/search`,
      bodyData
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(productData: Product) {
    const { error } = productSchema.validate(productData);
    if (error) {
      throw new Error(`Invalid product data: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/${VERSION}/products`,
      productData
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSellerShops() {
    const { url, headers, data } = this.generateRequestSign(
      `/seller/${VERSION}/shops`
    );

    try {
      const response = await axios.get(url, { headers, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async recommendCategory(product: Recommendation) {
    const { error } = recommendationSchema.validate(product);
    if (error) {
      throw new Error(`Invalid data: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/categories/recommend`,
      product
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: string, productData: Product) {
    const { error } = productSchema.validate(productData);
    if (error) {
      throw new Error(`Invalid product data: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/${id}`,
      productData
    );

    try {
      const response = await axios.put(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getWarehouses() {
    const { url, headers, data } = this.generateRequestSign(
      `/logistics/${VERSION}/warehouses`
    );

    try {
      const response = await axios.get(url, { headers, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductPrices(id: string, skus: ProductPrices) {
    const { error } = productPricesSchema.validate(skus);
    if (error) {
      throw new Error(`Invalid SKU data: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/${id}/prices/update`,
      skus
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async partiallyEditProduct(id: string, productData: ProductPartialEdit) {
    const { error } = productPartailEditSchema.validate(productData);
    if (error) {
      throw new Error(`Invalid product data: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/${id}/partial_edit`,
      productData
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryAttributes(id: string) {
    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/categories/${id}/attributes`,
      {
        locale: LOCALE,
      }
    );

    try {
      const response = await axios.get(url, { headers, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductInventory(id: string, skus: SkuInventory[]) {
    const { error } = skuInventorySchema.validate(skus);
    if (error) {
      throw new Error(`Invalid SKU data: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/${id}/inventory/update`,
      {
        skus,
      }
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async activateProducts(productIds: ProductIds) {
    const { error } = productIdsSchema.validate(productIds);
    if (error) {
      throw new Error(`Invalid product ids: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/activate`,
      {
        product_ids: productIds,
      }
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deactivateProducts(productIds: ProductIds) {
    const { error } = productIdsSchema.validate(productIds);
    if (error) {
      throw new Error(`Invalid product ids: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/deactivate`,
      {
        product_ids: productIds,
      }
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProducts(productIds: ProductIds) {
    const { error } = productIdsSchema.validate(productIds);
    if (error) {
      throw new Error(`Invalid product ids: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products`,
      { product_ids: productIds }
    );

    try {
      const response = await axios.delete(url, { headers, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async recoverProducts(productIds: ProductIds) {
    const { error } = productIdsSchema.validate(productIds);
    if (error) {
      throw new Error(`Invalid product ids: ${error.details[0].message}`);
    }

    const { url, headers, data } = this.generateRequestSign(
      `/product/${VERSION}/products/recover`,
      {
        product_ids: productIds,
      }
    );

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default TikTok;
