import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO{
    @ApiProperty({example:'test_example@mail.com', description: 'email of user'})
    readonly email:string;

    @ApiProperty({example:'42isAnswer', description: 'password of user'})
    readonly password:string;

    @ApiProperty({example:'Ivan', description: 'name of user '})
    readonly name:string;

    @ApiProperty({example:'Ivanovich', description: 'last name of user '})
    readonly lastName:string;
}