import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class ProductDto{
   
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;
}