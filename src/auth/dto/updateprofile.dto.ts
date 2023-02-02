import { IsEmail, 
         IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDTO{

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
}
