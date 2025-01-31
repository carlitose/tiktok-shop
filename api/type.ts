export interface Image {
	uri: string;
	width: number;
	height: number;
}

export interface Attribute {
	id: string;
	name: string;
	sku_img?: Image;
	value_id: string;
	value_name: string;
}

export interface Price {
	amount: string;
	currency: string;
}

export interface Inventory {
	warehouse_id: string;
	quantity: number;
}

export interface Sku {
	id?: string;
	external_sku_id?: string;
	sales_attributes: Attribute[];
	price: Price;
	inventory: Inventory[];
}

export interface PackageWeight {
	unit: string;
	value: string;
}

export interface Certification {}

export interface Video {
	ratio?: string
	resolution?: string;
	duration?: number;
	selling_points?: string[];
}

export interface Product {
	description: string;
	category_id: string;
	brand_id?: string;
	main_images: Image[];
	skus: Sku[];
	title: string;
	is_cod_allowed?: boolean;
	certifications?: Certification[];
	package_weight: PackageWeight;
	product_attributes?: object[];
	size_chart?: object;
	package_dimensions?: object;
	external_product_id?: string;
	delivery_option_ids?: string[];
	video?: Video;
}

export interface ProductPartialEdit {
	description?: string;
	category_id?: string;
	brand_id?: string;
	main_images?: Image[];
	skus?: Sku[];
	title?: string;
	is_cod_allowed?: boolean;
	certifications?: Certification[];
	package_weight?: PackageWeight;
	product_attributes?: object[];
	size_chart?: object;
	package_dimensions?: object;
	external_product_id?: string;
	delivery_option_ids?: string[];
	video?: Video;
}

export interface Recommendation {
	product_title: string;
	description: string;
}

export interface ProductPrices {
	skus: Sku[];
}

export interface SkuInventory {
	id: string;
	inventory: { quantity: number }[];
}

export type ProductIds = string[];

export interface Brand {
	name:string
} 

export interface OrderStatus{
	order_status:string
}