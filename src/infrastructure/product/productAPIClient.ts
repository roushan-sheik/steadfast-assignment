import { delay } from "@/utils/functions/delay";
import { config } from "@/constants/config";
import { mockProducts } from "./mockProducts";
import { Product } from "@/types/product/types";

class ProductAPIClient {
  private readonly headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  private readonly apiUrl = config.baseUrl;

  public async getProducts(): Promise<Product[]> {
    await delay(1000);
    return mockProducts;
  }
}

export const productAPIClient = new ProductAPIClient();
