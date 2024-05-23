import { ApiProperty } from "@nestjs/swagger";

export class BucketPostDTO {
    @ApiProperty({example: ['1', '2'], description: 'Array of product ids'})
    readonly products_id: string[];

}