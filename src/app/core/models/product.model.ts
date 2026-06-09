export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Made required since it's present in your payload structure
}