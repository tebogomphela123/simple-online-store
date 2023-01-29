import {BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dot/register.dto';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {


    constructor(
        private userService: UserService, 
        private jwtService: JwtService){
    }

    @Post('admin/register')
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
    async login( 
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response : Response
    ){
        const user = await this.userService.findOne({email: email});
        if(!user){
            throw new NotFoundException('User not found');
        }
        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid credentials')
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id
        }); 

        response.cookie('jwt', jwt, {httpOnly: true})
        return {
            message: 'success'
        };
    }

    
    @UseGuards(AuthGuard)
    @Get('admin/user')
    async user(@Req() request: Request){

        const cookie = request.cookies['jwt']
        const {id} = await this.jwtService.verifyAsync(cookie);
        const user = await this.userService.findOne({id});
        return user;
    }


    @UseGuards(AuthGuard)
    @Post('admin/logout')
    async logout( @Res({passthrough:true}) response: Response)
    {
        response.clearCookie('jwt');
        return {
            message: "sueccess"
        }
    }
}
