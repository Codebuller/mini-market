import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOAuth2, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDTO } from './dto/auth-user.dto';

@ApiTags('Autentification')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @ApiResponse({status:200})
    @Post('/login')
    login(@Body() userDto: AuthUserDTO ){
        return this.authService.login(userDto);
    }

}