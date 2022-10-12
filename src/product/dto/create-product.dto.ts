export class CreateProductDto {
    name:string;
    description:string;
    price:number;
    category:string;
}

export class FilterProductDto{
    search:string;
    category:string;
}
