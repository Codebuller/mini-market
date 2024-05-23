import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDTO{
    @ApiProperty({example:'test_example@mail.com', description: 'email of user'})
    readonly email:string;
    @ApiProperty({example:'42isAnswer', description: 'password of user'})
    readonly password:string;
}