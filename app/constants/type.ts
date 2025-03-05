export interface ProductTypes{
  price: number;
  id:number;
  name:string;
  description:string;
  count:number;
  materials : {material :string } | null;
  image:string
}