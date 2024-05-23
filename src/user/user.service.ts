import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MariaService } from 'src/maria/maria.service';
import { User } from 'src/interfaces';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(private mariaService: MariaService) {}
    
    async createUser(dto:CreateUserDTO) {
        const hashPassword = await bcrypt.hash(dto.password,5);
        const response = await this.mariaService.mariaClient.query(
            'INSERT INTO `User` ( name, lastName, email, password ) VALUES(?, ?, ?, ?)',
            [dto.name, dto.lastName, dto.email, hashPassword]
        )

        return response[0][0] as User;

        // return user;
    }
    
    async getAllUsers(){
        const response =  await this.mariaService.mariaClient.query(
            'SELECT * FROM `User`'
        );
        return response[0] as User[];
    }
    async getUser(id:number){ 
        const response = await this.mariaService.mariaClient.query(
            'SELECT * FROM `User` WHERE id=?',[id]
        );
        return response[0][0] as User;
    }

    async remove(id:number){
        const response =  await this.mariaService.mariaClient.query(
            'DELETE FROM `User` WHERE id=?',[id]
        );
        return response[0];
    }
    async update(id:number, userUpdateDto:UpdateUserDto){
        const response = await this.mariaService.mariaClient.query(
            'UPDATE `User` SET name=?, lastName=?, email=? WHERE id=?',
            [userUpdateDto.name, userUpdateDto.lastName, userUpdateDto.email, id]
        );
        return response[0][0] as User;
    }
    async getUserByEmail(email:string){
        
        const response = await this.mariaService.mariaClient.query(
            'SELECT * FROM `User` WHERE email=?',[email]
        );
        return response[0][0] as User;
    }
    async getUserById(id:number){
        const response = await this.mariaService.mariaClient.query(
            'SELECT * FROM `User` WHERE id=?',[id]
        );
        return response[0][0] as User;
    }

    // onModuleInit() {
    //     const createUser = async () =>{
    //         try{
    //             // await  this.userRepository.destroy()
    //         //  ((await this.userRepository.findOne()).destroy())//.map(async(el)=>await el.destroy());
    //     const hashPassword = await bcrypt.hash(process.env.SUPERUSER_PASSWORD, 5);
    //     const existingUser = await this.getUserByEmail(process.env.SUPERUSER_EMAIL)[0];
    //     console.log(existingUser)
    //     // if (existingUser.length==0) {
    //     //   await this.createUser({ 
    //     //     name: 'Ivan',
    //     //     lastName: 'Ivanovich',
    //     //     email: process.env.SUPERUSER_EMAIL,
    //     //     password: hashPassword,            
    //     //   });
    //     // }
    // }
    // catch(er){
    //     console.log(er);
    // }
    // }
    // createUser();
    // }
}
