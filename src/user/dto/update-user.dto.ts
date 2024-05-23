import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiProperty({example:'test_example@mail.com', description: 'email of user'})
    readonly email:string;
    @ApiProperty({example:'42isAnswer', description: 'password of user'})
    readonly password:string;
    @ApiProperty({example:'Smith', description: 'last name of user'})
    readonly lastName:string;
    @ApiProperty({example:'John', description: 'name of user'})
    readonly name:string;
}