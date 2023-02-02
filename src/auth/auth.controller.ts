import { BadRequestException, 
         Body, 
         ClassSerializerInterceptor, 
         Controller, 
         Get, 
         NotFoundException, 
         Options, 
         Post, 
         Put, 
         Req,
         Res, 
         UseGuards, 
         UseInterceptors } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';
import { Response, 
         Request } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiCreatedResponse, 
         ApiTags , 
         ApiBadRequestResponse, 
         ApiOkResponse, 
         ApiForbiddenResponse, } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { PasswordUpdateDTO } from './dto/passwordupdate.dto';
import { UpdateProfileDTO } from './dto/updateprofile.dto';


@Controller()
@ApiTags('Admin')
@ApiBadRequestResponse({description: 'Bad Request'})
@ApiForbiddenResponse({ description: 'Forbidden Request'})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(
        private userService: UserService, 
        private jwtService: JwtService){
    }
     

    @Post('admin/register')
    @ApiCreatedResponse({description: 'The record has been successfully created.'})
    async register(@Body() body: RegisterDto ){

        const {password_confirm, ...data} = body;

        if(body.password !== password_confirm){
            throw new BadRequestException('Passwords do not match!');
        }

        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.save(
            {...data,
            password: hashed,
            is_ambassador: false}
        );
    }


    @Post('admin/login')
    @ApiCreatedResponse({description: 'Successfully logged in.'})
    async login(
        @Body() body:LoginDto,
        @Res({passthrough: true}) response : Response
    ){
        const user = await this.userService.findOne({email: body.email});
        if(!user){
            throw new NotFoundException('User not found');
        }
        if(!await bcrypt.compare(body.password, user.password)){
            throw new BadRequestException('Invalid credentials')
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id
        }); 

        response.cookie('jwt', jwt, {httpOnly: true})
        return { message : 'success'};
    }


    @Get('admin/user')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'Ok'})
    async user(@Req() request: Request){

        const cookie = request.cookies['jwt']
        const {id} = await this.jwtService.verifyAsync(cookie);
        const user = await this.userService.findOne({id});
        return user;
    }


    @UseGuards(AuthGuard)
    @Post('admin/logout')
    @ApiOkResponse({ description: 'Ok'})
    async logout( @Res({passthrough:true}) response: Response)
    {
        response.clearCookie('jwt');
        return {
            message: "success"
        }
    }


    @UseGuards(AuthGuard)
    @Put('admin/users/info')
    @ApiOkResponse({description: "Ok"})
    async updateProfile(@Body() updateProfileDTO:UpdateProfileDTO,
        @Req() request: Request
    ){
        const cookie = request.cookies['jwt'];
        const {id} = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {  
            first_name: updateProfileDTO.first_name,
            last_name: updateProfileDTO.last_name,
            email: updateProfileDTO.email
        });
        return this.userService.findOne({id});
    }


    @UseGuards(AuthGuard)
    @Put('admin/users/password')
    @ApiOkResponse({description: "Ok"})
    async updatePassword(@Body() passwordUpdateDTO: PasswordUpdateDTO,
        @Req() request: Request
    ){
        const cookie = request.cookies['jwt'];
        const {id} = await this.jwtService.verifyAsync(cookie);

        if(passwordUpdateDTO.password !== passwordUpdateDTO.password_confirm){
            throw new BadRequestException('Passwords do not match!');
        }

        const hashed = await bcrypt.hash(passwordUpdateDTO.password, 12);
        await this.userService.update(id, {  
            password: hashed
        });

        return this.userService.findOne({id});
    }


}
