import { IsEmail, 
         IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto{
    
    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    password_confirm: string;
}




