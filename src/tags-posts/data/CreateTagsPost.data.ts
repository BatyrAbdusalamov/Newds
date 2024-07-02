import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTagsPost {
    @IsNotEmpty()
    @IsNumber()
    idPosts:number;
    @IsNotEmpty()
    @IsNumber()
    idTags:number;
}