import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthUserDTO } from './dto/auth-user.dto';
import { User } from 'src/interfaces';

const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {

    constructor(private userService:UserService, 
                private jwtService: JwtService){}
   
    async login( userDto: AuthUserDTO ){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async generateToken(user:User){
        const payload = {email:user.email, id: user.id};
        return {token: this.jwtService.sign(payload)};
    }
    private async validateUser( userDto : AuthUserDTO ){
        const user = await this.userService.getUserByEmail(userDto.email);
        console.log(user)
        if(!user){
            throw new HttpException('User is not autentificated', HttpStatus.BAD_REQUEST)
        }
        const passwordEqual = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEqual)
            return user;
        else
            throw new UnauthorizedException({message:'Uncorrect email or password'}); 
    }
}