import { Product } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SingleProduct } from "@/utils/types";

// Get products based on pageNumber
export async function getProducts(pageNumber: string | undefined): Promise<Product[]> {
  try {
    const response = await fetch(
        `${DOMAIN}/api/products?pageNumber=${pageNumber}`,
        { cache: 'no-store' }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error fetching products:", errorDetails);
      throw new Error("Failed to fetch products");  // Throw the error
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;  // Re-throw the error to handle it further up the call stack
  }
}

// Get products count
export async function getProductsCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/products/count`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error("Failed to get products count");
  }

  const { count } = await response.json() as { count: number };
  return count;
}

// Get products based on searchText
export async function getProductsBasedOnSearch(searchText: string): Promise<Product[]> {
  const response = await fetch(`${DOMAIN}/api/products/search?searchText=${searchText}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

// Get single product by id
export async function getSingleProduct(productId: string): Promise<SingleProduct> {
  const response = await fetch(`${DOMAIN}/api/products/${productId}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}
