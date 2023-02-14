import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class ProductDto{
   
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;
}