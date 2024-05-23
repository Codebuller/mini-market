import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
// @ApiBearerAuth()
export class UserController {
    constructor(private userService: UserService){}

    
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:'Creating user'})
    @ApiResponse({status:200, type: CreateUserDTO})
    @Post()
    create(@Body() userDto: CreateUserDTO){
        return this.userService.createUser(userDto);
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:'Getting all users from db'})
    @ApiResponse({status:200, type: [CreateUserDTO]})
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:'Get user by ID'})
    @ApiResponse({status:200, type: CreateUserDTO})
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.getUser(id);
    }
    
    @ApiOperation({summary:'Delete user'})
    @ApiResponse({status:200})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
  }
}
