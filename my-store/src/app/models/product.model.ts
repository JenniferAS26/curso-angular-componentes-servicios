import { Category } from "./category.model";

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {// Partial hace que todos nuestros atributos sean opcionales
  // title?: string;
  // price?: number;
  // images?: string[];
  // description?: string;
  // categoryId?: number;
}