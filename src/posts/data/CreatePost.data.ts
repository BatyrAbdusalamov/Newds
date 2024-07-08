import { IsNotEmpty, IsNumber, IsString } from "class-validator";

interface Image {
    type: string;
    data: Buffer;
}
export class CreatePostData {
    @IsNotEmpty() 
    @IsString()
    readonly content: string;
    @IsNotEmpty() 
    @IsString()
    readonly topic: string;
    @IsNotEmpty() 
    @IsNumber()
    readonly idPostUser: number;
    readonly tag? : Array<string>;
    readonly image? : Image;
}