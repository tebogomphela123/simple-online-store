import { IsEmail, 
    IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PasswordUpdateDTO{

@ApiProperty()
@IsNotEmpty()
password: string;

@ApiProperty()
@IsNotEmpty()
password_confirm: string;
}
