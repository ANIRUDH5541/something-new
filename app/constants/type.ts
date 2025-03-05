export interface ProductTypes{
  price: number;
  id:number;
  name:string;
  description:string;
  count:number;
  materials : Record<string , string>;
  image:string
}