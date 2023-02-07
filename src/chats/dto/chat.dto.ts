import { IsString } from "class-validator";

export class ChatDto {

    @IsString()
    title: string;

    @IsString()
    imageUrl: string;
}